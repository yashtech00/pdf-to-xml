import { prisma } from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export default async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }

    try {
        const results = await prisma.conversion.findMany({
            where:{
                file: {
                    userId:session.user.id
                }
            },
        })
        return NextResponse.json({ results }, { status: 200 });
    } catch (e) {
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}