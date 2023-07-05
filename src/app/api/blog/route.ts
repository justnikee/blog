import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { Prisma } from "@prisma/client";

async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return (error);
        ('Database connection error')
    }
}

export const GET = async (res: NextResponse, req: Request) => {
    console.log('get')

    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({message: 'Success', posts}, {status: 200})
     } catch(error){
        return NextResponse.json({ message: 'Facing Error!!', error }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { name, description } = await req.json();
        await main();
        const post = await prisma.post.create({data: {name,description}})
        return NextResponse.json({ Message: "success", post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ Message: "Failed", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
 }