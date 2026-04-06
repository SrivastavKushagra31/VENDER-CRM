import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { kycSchema } from '@/lib/validation/kyc-schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Server-side validation with Zod
    const validated = kycSchema.parse(body)

    // Using a hardcoded vendor for simulation
    const vendor = await prisma.vendor.upsert({
      where: { email: validated.email },
      update: {
        name: validated.fullName,
        phone: validated.phone,
        businessName: validated.businessName,
        status: 'PENDING'
      },
      create: {
        email: validated.email,
        name: validated.fullName,
        phone: validated.phone,
        businessName: validated.businessName,
        status: 'PENDING'
      }
    })

    // Simulate document record creation (Mocking file storage URLs)
    // In a real app, you would handle multi-part file uploads here
    await prisma.kycDocument.createMany({
      data: [
        { 
          type: 'PAN', 
          url: `https://s3.amazonaws.com/vendorbridge/docs/pan_${validated.panNumber}.pdf`, 
          vendorId: vendor.id,
          status: 'PENDING'
        },
        { 
          type: 'AADHAAR', 
          url: `https://s3.amazonaws.com/vendorbridge/docs/aadhar_${validated.aadhaarNumber}.pdf`, 
          vendorId: vendor.id,
          status: 'PENDING'
        }
      ]
    })

    // Trigger mock validation workflow
    // Simulation: Update status to VERIFIED after 30 seconds (not doable in request handler, but logic exists)
    
    return NextResponse.json({ 
      success: true, 
      message: 'KYC submitted successfully. Verification is in progress.',
      vendorId: vendor.id 
    })
  } catch (err: any) {
    console.error('KYC Submission Error:', err)
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid input data or submission failure.',
      details: err.errors || err.message 
    }, { status: 400 })
  }
}
