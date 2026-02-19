import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const listings = [
        {
            id: "L001",
            title: "Industrial Plot - SEZ Zone A",
            category: "GOVERNMENT",
            purpose: "LEASE",
            location: "Kharghar Sector 20",
            state: "Maharashtra",
            district: "Raigad",
            area: 5000,
            areaUnit: "sq m",
            price: 75000000,
            currency: "INR",
            verified: true,
            authority: "CIDCO",
            tags: ["Industrial", "SEZ", "Road Touch"],
            imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800",
            description: "Prime industrial land located within the CIDCO Special Economic Zone. Ideal for manufacturing or logistics hubs. Features 24/7 power supply, water connection, and wide approach roads for heavy vehicles.",
            sellerName: "CIDCO Maharashtra",
            sellerEmail: "contact@cidco.maharashtra.gov.in",
            sellerPhone: "+91-22-67121000"
        },
        {
            id: "L002",
            title: "Prime Residential Land",
            category: "PRIVATE",
            purpose: "SALE",
            location: "Whitefield",
            state: "Karnataka",
            district: "Bengaluru",
            area: 2400,
            areaUnit: "sq ft",
            price: 18000000,
            currency: "INR",
            verified: true,
            authority: "BBMP",
            tags: ["Residential", "Gated Community"],
            imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
            description: "East-facing residential plot in a premium gated community. Clear titles, BBMP A-Khata ready. Located just 1.5km from the main IT corridor.",
            sellerName: "Aashish Gupta",
            sellerEmail: "aashish.g@example.com",
            sellerPhone: "+91-9876543210"
        },
        {
            id: "L003",
            title: "Agricultural Expansion Parcel",
            category: "PRIVATE",
            purpose: "SALE",
            location: "Hoshiarpur Outer",
            state: "Punjab",
            district: "Hoshiarpur",
            area: 5,
            areaUnit: "Acres",
            price: 45000000,
            currency: "INR",
            verified: false,
            authority: "Revenue Dept",
            tags: ["Agriculture", "Fertile Soil"],
            imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
            description: "Rich fertile agricultural land suitable for major expansion or institutional farming. Includes access to canal water and a tube well.",
            sellerName: "Pritam Singh",
            sellerEmail: "psingh@punjabmail.in",
            sellerPhone: "+91-9988776655"
        },
        {
            id: "L004",
            title: "Civic Amenity Site #42",
            category: "GOVERNMENT",
            purpose: "LEASE",
            location: "Sector V, Salt Lake",
            state: "West Bengal",
            district: "Kolkata",
            area: 12000,
            areaUnit: "sq ft",
            price: 120000000,
            currency: "INR",
            verified: true,
            authority: "HIDCO",
            tags: ["Commercial", "IT Hub"],
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
            description: "High-visibility commercial plot intended for public utility or institutional services. Located in the heart of Kolkata's IT hub.",
            sellerName: "WB-HIDCO Authority",
            sellerEmail: "info@wbhidco.in",
            sellerPhone: "+91-33-23246037"
        }
    ];
    for (const listing of listings) {
        await prisma.listing.upsert({
            where: { id: listing.id },
            update: listing,
            create: listing,
        });
    }
    console.log('Seeding complete.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map