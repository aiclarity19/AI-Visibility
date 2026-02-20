-- Create payments table for tracking payment and onboarding status
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  website TEXT,
  payment_timestamp TIMESTAMPTZ NOT NULL,
  stripe_payment_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('paid', 'onboarding_sent', 'onboarding_completed', 'ready_for_optimization')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on customer_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_customer_email ON payments(customer_email);

-- Create index on stripe_payment_id for idempotency checks
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_id ON payments(stripe_payment_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

