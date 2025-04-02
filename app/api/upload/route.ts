import { prisma } from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import multer from "multer";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    upload.single("File")(req as any, res as any, async (err: any) => {
        if (err) {
            return NextResponse.json({ error: "Error uploading file" }, { status: 400 });
        }

        const file = (req as any).file;
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        try {
            const uploadFile = await prisma.file.create({
                data: {
                    filename: file.name,
                    xmlContent: Buffer.from(file.buffer).toString("base64"),
                    userId:session.user.id,
                }
            })
            return NextResponse.json({ message: "File uploaded successfully", fileId: uploadFile.id }, { status: 200 });
        } catch (e) {
            return NextResponse.json({ error: "Error saving file to database" }, { status: 500 });
        }
    })
}
