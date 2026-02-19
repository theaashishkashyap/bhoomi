import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a default Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bhoomi.com' },
    update: {},
    create: {
      email: 'admin@bhoomi.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const listings = [
    {
      id: "L001",
      title: "Industrial Plot - SEZ Zone A",
      category: "GOVERNMENT",
      purpose: "LEASE",
      location: "Kharghar Sector 20",
      state: "Maharashtra",
      price: 75000000,
      latitude: 19.0473,
      longitude: 73.0699,
      imageUrl: "https://images.unsplash.com/photo-1590013330462-094949a712cc?auto=format&fit=crop&q=80&w=1200",
      area: 5000,
      areaUnit: "sq m",
      description: "Prime industrial land located within the CIDCO Special Economic Zone. Ideal for manufacturing or logistics hubs. Features 24/7 power supply, water connection, and wide approach roads for heavy vehicles.",
      authority: "CIDCO",
      leaseTerms: "99 Year Industrial Lease. Annual lease rent at 1% of land value. Escalation of 10% every 5 years.",
      eligibilityRules: "Registered manufacturing units only. Minimum investment commitment of 100 Cr required. Priority for Net-Zero emission industries.",
      buyerRequirements: "Institutional PAN, GST Registration, 3 years audited financial statements, Environmental clearance certificate.",
      additionalDetails: "Includes single-window clearance assistance for building permits.",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L002",
      title: "Prime Residential Land",
      category: "PRIVATE",
      purpose: "SALE",
      location: "Whitefield, Bengaluru",
      state: "Karnataka",
      price: 18000000,
      latitude: 12.9698,
      longitude: 77.7500,
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fee78a6c?auto=format&fit=crop&q=80&w=1200",
      area: 2400,
      areaUnit: "sq ft",
      description: "East-facing residential plot in a premium gated community. Clear titles, BBMP A-Khata ready. Located just 1.5km from the main IT corridor.",
      authority: "BBMP",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L003",
      title: "Agricultural Expansion Parcel",
      category: "PRIVATE",
      purpose: "SALE",
      location: "Hoshiarpur Outer",
      state: "Punjab",
      price: 45000000,
      latitude: 31.5236,
      longitude: 75.9115,
      imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200",
      area: 5,
      areaUnit: "Acres",
      description: "Rich fertile agricultural land suitable for major expansion or institutional farming. Includes access to canal water and a tube well.",
      authority: "Revenue Dept",
      verifiedBadge: false,
      sellerId: admin.id
    },
    {
      id: "L004",
      title: "Civic Amenity Site #42",
      category: "GOVERNMENT",
      purpose: "LEASE",
      location: "Sector V, Salt Lake",
      state: "West Bengal",
      price: 120000000,
      latitude: 22.5726,
      longitude: 88.4339,
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      area: 12000,
      areaUnit: "sq ft",
      description: "High-visibility commercial plot intended for public utility or institutional services. Located in the heart of Kolkata's IT hub.",
      authority: "HIDCO",
      leaseTerms: "33 Year Renewable Lease. Purpose restricted to non-profit or public utility services.",
      eligibilityRules: "Non-profit organizations, Educational Trusts, or Healthcare providers registered for at least 5 years.",
      buyerRequirements: "Trust Deed/Society registration, 80G certificate, Institutional identity nodes, Projected public impact report.",
      additionalDetails: "Sub-leasing strictly prohibited without HIDCO prior written consent.",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L005",
      title: "Office Development Site",
      category: "PRIVATE",
      purpose: "SALE",
      location: "Cyber City, Gurugram",
      state: "Haryana",
      price: 950000000,
      latitude: 28.4950,
      longitude: 77.0878,
      imageUrl: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=1200",
      area: 2,
      areaUnit: "Acres",
      description: "Premier commercial land in the heart of Cyber City. Approved for high-rise office development and verified institutional connectivity.",
      authority: "HSVP",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L006",
      title: "Tech Park Expansion Zone",
      category: "GOVERNMENT",
      purpose: "LEASE",
      location: "Hitech City, Hyderabad",
      state: "Telangana",
      price: 1500000000,
      latitude: 17.4483,
      longitude: 78.3915,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      area: 10,
      areaUnit: "Acres",
      description: "Institutional land earmarked for IT/ITES development in the primary technology corridor. Access to fiber optics and high-redundancy power.",
      authority: "TSIIC",
      leaseTerms: "60 Year Lease for IT/ITES development. Rent holiday for the first 2 years of operation.",
      eligibilityRules: "Validated Tech-sector corporations with minimum annual turnover of 500 Cr. Employment generation commitment required.",
      buyerRequirements: "STPI registration, Corporate identity nodes, Master layout proposal, Workforce projection documents.",
      additionalDetails: "Site includes redundant high-speed fiber backbone access.",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L007",
      title: "Coastal Resort Plot",
      category: "PRIVATE",
      purpose: "SALE",
      location: "Palolem Beach",
      state: "Goa",
      price: 250000000,
      latitude: 15.0100,
      longitude: 74.0232,
      imageUrl: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200",
      area: 50000,
      areaUnit: "sq ft",
      description: "Unique beachfront plot with CRZ approvals for premium resort development. High tourism potential with verified land titles.",
      authority: "TCP Dept",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L008",
      title: "Eco-Farm & Wellness Site",
      category: "PRIVATE",
      purpose: "SALE",
      location: "Coorg Valley",
      state: "Karnataka",
      price: 120000000,
      latitude: 12.4244,
      longitude: 75.7382,
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1200",
      area: 15,
      areaUnit: "Acres",
      description: "Lush green estate ideal for an organic coffee plantation or luxury wellness retreat. Clear boundary markers and verified soil health.",
      authority: "Revenue Dept",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L009",
      title: "Atal Bhawan Complex - MMMUT",
      category: "GOVERNMENT",
      purpose: "SALE",
      location: "Gorakhpur, MMMUT Campus",
      state: "Uttar Pradesh",
      price: 1500000000,
      latitude: 26.7588,
      longitude: 83.4331,
      imageUrl: "/images/listings/atal_bhawan.png",
      area: 25,
      areaUnit: "Acres",
      description: "Iconic institutional property featuring the Atal Bhawan at Madan Mohan Malaviya University of Technology. A massive state-of-the-art facility ideal for research centers, corporate regional offices, or institutional hubs in East UP.",
      authority: "UP Govt / MMMUT",
      leaseTerms: "Permanent Institutional Transfer or Long-term 99 Year Public-Private Partnership (PPP) model.",
      eligibilityRules: "National importance institutions, Multi-national corporations with R&D focus, or Educational trusts with NAAC A++ rating.",
      buyerRequirements: "Central Government Identity Node, Institutional Board Resolution, 10-year Vision Plan for the property.",
      additionalDetails: "Historical landmark status with modern IT infrastructure and dedicated power substation.",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L010",
      title: "CSE Department - MMMUT",
      category: "GOVERNMENT",
      purpose: "LEASE",
      location: "Gorakhpur, MMMUT Campus",
      state: "Uttar Pradesh",
      price: 900000000,
      latitude: 26.7592,
      longitude: 83.4345,
      imageUrl: "/images/listings/cse_department.png",
      area: 8,
      areaUnit: "Acres",
      description: "State-of-the-art Computer Science & Engineering department at MMMUT Gorakhpur. The facility includes high-speed networking labs, modular computer centers, and institutional administration blocks.",
      authority: "UP Govt / MMMUT",
      leaseTerms: "Institutional Lease restricted to Technology Education sector or Government R&D partners.",
      eligibilityRules: "Reputed technical education providers or government-recognized research labs with a track record of 10+ years.",
      buyerRequirements: "Educational Trust Identity Node, Research Proposal, Faculty Capability Statement.",
      additionalDetails: "Includes existing hardware infrastructure and campus-wide fiber connectivity.",
      verifiedBadge: true,
      sellerId: admin.id
    },
    {
      id: "L011",
      title: "Raman Bhawan - Institutional Complex (MMMUT)",
      category: "GOVERNMENT",
      purpose: "SALE",
      location: "Gorakhpur, MMMUT Campus",
      state: "Uttar Pradesh",
      price: 550000000,
      latitude: 26.7580,
      longitude: 83.4350,
      imageUrl: "/images/listings/raman_bhawan.png",
      area: 5,
      areaUnit: "Acres",
      description: "Premiere institutional residential facility (Raman Bhawan) at Madan Mohan Malaviya University of Technology. Prime real estate asset within the university ecosystem, offering high-tier structural integrity and central utility integration.",
      authority: "UP Govt / MMMUT",
      leaseTerms: "Not applicable - Permanent Transfer of Property Rights (Institutional Sale).",
      eligibilityRules: "Government-authorized educational trusts, state entities, or high-tier institutional investors with 15+ years of operational history.",
      buyerRequirements: "National Institutional ID Node, Proof of Sovereign Funds, Certified Structural Utilization Plan, 5-year maintenance blueprint.",
      additionalDetails: "Fully integrated with core campus nodes. Direct access to university power grid and water systems.",
      verifiedBadge: true,
      sellerId: admin.id
    }
  ];

  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { id: listing.id },
      update: listing,
      create: listing,
    });
  }

  console.log('Seeding complete with geospatial coordinates and high-fidelity imagery.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
