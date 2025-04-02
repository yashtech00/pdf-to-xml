import { prisma } from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { create } from "xmlbuilder2";
import pdfParse from "pdf-parse";


export default async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { fileId } = body;
    if (!fileId) {
        return NextResponse.json("File ID is required", { status: 400 });
    }

    try {
        const file = await prisma.file.findUnique({
            where: {
                id: fileId,
                userId:session.user.id
            }
        })
        if (!file) {
            return NextResponse.json("File not found", { status: 404 });
        }
        if (!file.xmlContent) {
            return NextResponse.json("File content is missing", { status: 400 });
        }
        const pdfData = await pdfParse(Buffer.from(file.xmlContent, "base64"));
        const xmlData = create({ version: "1.0" })
            .ele("root")
            .ele("filename", file.filename)
            .txt(pdfData.text)
            .up()
            .end({ prettyPrint: true });    
        
        const conversion = await prisma.conversion.create({
            data: {
                fileId,
                xmlResult:xmlData
            }
        })
        return NextResponse.json({ message: "File converted successfully", conversionId: conversion.id }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Error converting file" }, { status: 500 });
    }
}