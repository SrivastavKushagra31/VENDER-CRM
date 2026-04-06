import { z } from 'zod'

export const kycSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  businessName: z.string().min(3, "Business name must be at least 3 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  email: z.string().email("Invalid email address"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g. ABCDE1234F)"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
})

export type KYCSchema = z.infer<typeof kycSchema>
