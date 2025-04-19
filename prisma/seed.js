import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const signupSetting = await prisma.utils.upsert({
        where: { name: "is-signup-enabled" },
        update: {},
        create: {
            name: "is-signup-enabled",
            data: { enabled: true },
        },
    });

    console.log("Created signup setting:", signupSetting);
    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
 