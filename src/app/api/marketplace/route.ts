import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const marketplaces = await prisma.marketplace.findMany({
      include: {
        connections: true
      }
    })
    return NextResponse.json({ success: true, marketplaces })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
