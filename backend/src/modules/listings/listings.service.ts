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
    sellerId: "system",
    isSellerVerified: true,
    coordinates: { lat: 19.0473, lng: 73.0699 }
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
    sellerId: "user-1",
    coordinates: { lat: 12.9698, lng: 77.7500 }
  },
  {
    id: "GKP-G-1",
    title: "GIDA Phase IV Industrial Plot",
    category: "GOVERNMENT",
    purpose: "LEASE",
    location: "Sector 13, GIDA",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    area: 2500,
    areaUnit: "sq m",
    price: 45000000,
    currency: "INR",
    verified: true,
    authority: "GIDA",
    tags: ["Industrial", "Manufacturing"],
    imageUrl: "https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=800",
    description: "Official GIDA industrial allotment for Phase IV expansion. Ready for factory setup with high-tension power line access.",
    sellerName: "GIDA Authority",
    sellerEmail: "allotment@gida.up.gov.in",
    sellerPhone: "+91-551-2200000",
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: "system",
    coordinates: { lat: 26.7126, lng: 83.2504 }
  },
  {
    id: "GKP-G-2",
    title: "Taramandal Institutional Zone C",
    category: "GOVERNMENT",
    purpose: "LEASE",
    location: "Lake View Road, Taramandal",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    area: 1200,
    areaUnit: "sq m",
    price: 85000000,
    currency: "INR",
    verified: true,
    authority: "GDA",
    tags: ["Institutional", "Tourism"],
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
    description: "Premium lake-facing institutional land managed by Gorakhpur Development Authority. Reserved for tourism or education infrastructure.",
    sellerName: "GDA Gorakhpur",
    sellerEmail: "vcgda@nic.in",
    sellerPhone: "+91-551-2333333",
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: "system",
    coordinates: { lat: 26.7412, lng: 83.3855 }
  },
  {
    id: "GKP-G-3",
    title: "Rapti Nagar Civic Center Parcel",
    category: "GOVERNMENT",
    purpose: "LEASE",
    location: "Rapti Nagar Phase 2",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    area: 800,
    areaUnit: "sq m",
    price: 35000000,
    currency: "INR",
    verified: true,
    authority: "GDA",
    tags: ["Commercial", "Civic"],
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
    description: "Proposed site for community utility center. High-density residential catchment area.",
    sellerName: "GDA Gorakhpur",
    sellerEmail: "vcgda@nic.in",
    sellerPhone: "+91-551-2333333",
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: "system",
    coordinates: { lat: 26.7821, lng: 83.3951 }
  }
];

export const getAllListings = async (filters: { category?: string | undefined; search?: string | undefined; state?: string | undefined }) => {
  try {
    const { category, search, state } = filters;
    const where: any = {};
    if (category && category !== 'ALL') where.category = category;
    if (state && state !== 'ALL') where.state = state;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
      ];
    }
    const dbListings = await prisma.listing.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' },
      include: { seller: true }
    });
    
    return dbListings.map(l => {
      let sellerName = l.seller?.name || "User";
      let sellerEmail = l.seller?.email;
      let sellerPhone = l.seller?.phone;

      if (!l.seller?.showIdentity) {
         sellerName = l.seller?.isAadharVerified ? "Verified User" : "User";
         sellerEmail = "Protected"; 
         sellerPhone = "Protected";
      }

      // Calculate Land Demand Index (LDI)
      // Formula: (PriceGrowth * 0.4) + (Views * 0.1) + (Inquiries * 0.3) + (Saves * 0.2)
      // We normalize these for a score out of 100
      const score = Math.min(100, Math.round(
        (l.priceGrowth * 2) + 
        (Math.log10(l.views + 1) * 10) + 
        (l.inquiryCount * 5) + 
        (l.saveCount * 8)
      ));

      let demandLabel = "Low Demand";
      if (score > 70) demandLabel = "High Demand";
      else if (score > 30) demandLabel = "Moderate Demand";

      let finalImageUrl = l.imageUrl;
      if (!finalImageUrl || finalImageUrl.startsWith('blob:')) {
        // Fallback to a relevant land/infrastructure image if image is missing or invalid local blob
        finalImageUrl = l.category === 'GOVERNMENT' 
          ? "https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=800"
          : "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800";
      }

      return {
        ...l,
        imageUrl: finalImageUrl,
        sellerName,
        sellerEmail,
        sellerPhone,
        isSellerVerified: l.seller?.isAadharVerified,
        coordinates: l.latitude && l.longitude ? { lat: l.latitude, lng: l.longitude } : undefined,
        demandScore: score,
        demandLabel
      };
    });
  } catch (error) {
    console.warn('Listing Service: Database unavailable, falling back to mock data.', error);
    // Filter MOCK data
    let data = [...MOCK_LISTINGS];
    if (filters.category && filters.category !== 'ALL') data = data.filter(l => l.category === filters.category);
    if (filters.state && filters.state !== 'ALL') data = data.filter(l => l.state === filters.state);
    if (filters.search) {
      const s = filters.search.toLowerCase();
      data = data.filter(l => l.title?.toLowerCase().includes(s) || l.location?.toLowerCase().includes(s));
    }
    return data;
  }
};

export const getListingById = async (id: string) => {
  try {
    // Increment views on every fetch
    const l = await prisma.listing.update({ 
      where: { id },
      data: { views: { increment: 1 } },
      include: { seller: true }
    });
    if (!l) return null;

    let sellerName = l.seller?.name || "User";
    let sellerEmail = l.seller?.email;
    let sellerPhone = l.seller?.phone;

    if (!l.seller?.showIdentity) {
       sellerName = l.seller?.isAadharVerified ? "Verified User" : "User";
       sellerEmail = "Protected";
       sellerPhone = "Protected";
    }

    const score = Math.min(100, Math.round(
      (l.priceGrowth * 2) + 
      (Math.log10(l.views + 1) * 10) + 
      (l.inquiryCount * 5) + 
      (l.saveCount * 8)
    ));

    let demandLabel = "Low Demand";
    if (score > 70) demandLabel = "High Demand";
    else if (score > 30) demandLabel = "Moderate Demand";

    let finalImageUrl = l.imageUrl;
    if (!finalImageUrl || finalImageUrl.startsWith('blob:')) {
      finalImageUrl = l.category === 'GOVERNMENT' 
        ? "https://images.unsplash.com/photo-1541819661191-2090875b0ec8?auto=format&fit=crop&q=80&w=800"
        : "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=800";
    }

    return {
      ...l,
      imageUrl: finalImageUrl,
      sellerName,
      sellerEmail,
      sellerPhone,
      isSellerVerified: l.seller?.isAadharVerified,
      coordinates: l.latitude && l.longitude ? { lat: l.latitude, lng: l.longitude } : undefined,
      demandScore: score,
      demandLabel
    };
  } catch (error) {
    const mock = MOCK_LISTINGS.find(l => l.id === id);
    if (mock) {
       return { ...mock, demandScore: 45, demandLabel: "Moderate Demand" };
    }
    return null;
  }
};

export const createListing = async (listingData: any) => {
  return await prisma.listing.create({ data: listingData });
};
