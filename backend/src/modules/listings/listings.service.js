import { prisma } from '../../common/prisma.js';
// MOCK FALLBACK DATA (Mirrors Frontend)
const MOCK_LISTINGS = [
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
        description: "Prime industrial land located within the CIDCO Special Economic Zone. Ideal for manufacturing or logistics hubs.",
        sellerName: "CIDCO Maharashtra",
        sellerEmail: "contact@cidco.maharashtra.gov.in",
        sellerPhone: "+91-22-67121000",
        createdAt: new Date(),
        updatedAt: new Date(),
        sellerId: "system"
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
        description: "East-facing residential plot in a premium gated community. Clear titles, BBMP A-Khata ready.",
        sellerName: "Aashish Gupta",
        sellerEmail: "aashish.g@example.com",
        sellerPhone: "+91-9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
        sellerId: "user-1"
    }
];
export const getAllListings = async (filters) => {
    try {
        const { category, search, state } = filters;
        const where = {};
        if (category && category !== 'ALL')
            where.category = category;
        if (state && state !== 'ALL')
            where.state = state;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } },
            ];
        }
        return await prisma.listing.findMany({ where, orderBy: { createdAt: 'desc' } });
    }
    catch (error) {
        console.warn('Listing Service: Database unavailable, falling back to mock data.');
        // Filter MOCK data
        let data = [...MOCK_LISTINGS];
        if (filters.category && filters.category !== 'ALL')
            data = data.filter(l => l.category === filters.category);
        if (filters.state && filters.state !== 'ALL')
            data = data.filter(l => l.state === filters.state);
        if (filters.search) {
            const s = filters.search.toLowerCase();
            data = data.filter(l => l.title.toLowerCase().includes(s) || l.location.toLowerCase().includes(s));
        }
        return data;
    }
};
export const getListingById = async (id) => {
    try {
        return await prisma.listing.findUnique({ where: { id } });
    }
    catch (error) {
        return MOCK_LISTINGS.find(l => l.id === id) || null;
    }
};
export const createListing = async (listingData) => {
    return await prisma.listing.create({ data: listingData });
};
//# sourceMappingURL=listings.service.js.map