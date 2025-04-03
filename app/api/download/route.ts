import { prisma } from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export default async function (req:NextRequest) {
    
    const session = await getServerSession(authOptions);
    if( !session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    if(!fileId) {
        return new Response("File ID is required", { status: 400 });
    }

    try {
        const conversion = await prisma.conversion.findUnique({
            where: {
                fileId: { String(fileId) }
            }
        });
        if (!conversion) {
            return NextResponse.json({ error: "conversion not found" }, { status: 400 });
        }

        const headers = new Headers();
        headers.set("content-type", "application/xml");
        headers.set("content-disposition", `attachment; filename="converted-${fileId}.xml`);
        return new NextResponse(conversion.xmlResult, { status: 200, headers });
    } catch (e) {
        NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }


}