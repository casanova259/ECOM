const testimonials = [
    {
        initials: "SR",
        bg: "#fde8d8",
        color: "#d46b3a",
        name: "Sara R.",
        handle: "@sara.knits",
        verified: true,
        stars: 5,
        text: "Absolutely obsessed with my RASHI KNITWEAR sweater. The quality is unreal — soft, warm, and every stitch is perfect. Worth every penny.",
        tag: "Knitwear",
    },
    {
        initials: "TN",
        bg: "#e8f0e0",
        color: "#4a7c3f",
        name: "Tom N.",
        handle: "@tomdesigns",
        verified: true,
        stars: 5,
        text: "The handmade quality really shows. Gifted one to my mom and she cried. That's how you know it's good.",
    },
    {
        initials: "MP",
        bg: "#e8e0f0",
        color: "#6a4aac",
        name: "Mia P.",
        handle: "@mia.lifestyle",
        verified: true,
        quote: true,
        text: "I've ordered 3 times already. The eco-friendly packaging, the care in each item — you can feel the love that goes into it. RASHI KNITWEAR is my go-to for gifting.",
        tag: "Handmade",
    },
    {
        initials: "AK",
        bg: "#faf0e0",
        color: "#c9820a",
        name: "Arjun K.",
        handle: "@arjun_buys",
        verified: true,
        stars: 5,
        text: "Shipping was super fast and the item matched exactly what was shown. The colors are so rich in person. Love this brand.",
    },
    {
        initials: "LC",
        bg: "#e0f0f4",
        color: "#2a7c9a",
        name: "Laura C.",
        handle: "@lauracreative",
        verified: false,
        quote: true,
        text: "Stumbled upon RASHI KNITWEAR and my mind was blown. The seamless blend of traditional craftsmanship with modern style is a masterclass. Kudos to the whole team!",
        tag: "Eco-Friendly",
    },
    {
        initials: "PV",
        bg: "#f0e8f0",
        color: "#9a4aac",
        name: "Priya V.",
        handle: "@priyastyle",
        verified: true,
        stars: 5,
        text: "I like the variety of sizes and colors. The product interaction on the website is beautiful — made choosing so easy!",
    },
    {
        initials: "JM",
        bg: "#fce8e8",
        color: "#b03030",
        name: "James M.",
        handle: "@jm_lifestyle",
        verified: true,
        quote: true,
        text: "This site is an absolute goldmine for handmade goods. It's a huge collection of unique, premium pieces — all their own.",
        tag: "Premium",
    },
    {
        initials: "GF",
        bg: "#e8f4e8",
        color: "#2a8a4a",
        name: "Giulia F.",
        handle: "@giulia.finds",
        verified: false,
        stars: 5,
        text: "RASHI KNITWEAR is a complete collection of stunning pieces. Can't believe the value. My whole family wears their products now.",
    },
    {
        initials: "RD",
        bg: "#faf0e8",
        color: "#b07030",
        name: "Ravi D.",
        handle: "@ravi.dev",
        verified: true,
        quote: true,
        text: "The keychain I ordered was tiny but perfectly crafted. Gave me confidence to order bigger items. The attention to detail is next level.",
        tag: "Keychains",
    },
    {
        initials: "NK",
        bg: "#e8eaf8",
        color: "#3a4aac",
        name: "Nadia K.",
        handle: "@nadia.knits",
        verified: true,
        stars: 5,
        text: "Free shipping, great quality, fast delivery. What more could you ask for? My new favourite shop without a doubt.",
    },
    {
        initials: "OB",
        bg: "#f0f8e8",
        color: "#4a8a2a",
        name: "Oluwaseun B.",
        handle: "@olu_wears",
        verified: false,
        quote: true,
        text: "Man this is awesome. Came for one hoodie, stayed for the whole collection. The green one is fire and the fit is perfect.",
    },
    {
        initials: "YS",
        bg: "#fce8f4",
        color: "#9a2a6a",
        name: "Yuki S.",
        handle: "@yuki.style",
        verified: true,
        stars: 5,
        text: "So happy to see a brand that combines sustainability and style so effortlessly. Their work is a treasure trove for conscious shoppers.",
        tag: "Eco-Friendly",
    },
];

type Testimonial = (typeof testimonials)[number];

const VerifiedBadge = () => (
    <span className="inline-flex items-center justify-center w-[14px] h-[14px] rounded-full bg-[#1d9bf0] flex-shrink-0">
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);

const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-0.5 mb-2">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c9917a">
                <path d="M6 1l1.2 3.6H11L8.1 6.9l1.1 3.4L6 8.2l-3.2 2.1 1.1-3.4L1 4.6h3.8z" />
            </svg>
        ))}
    </div>
);

const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <div className="break-inside-avoid bg-white rounded-[18px] p-[18px] mb-4 border border-[#ede6de] inline-block w-full">
        <div className="flex items-center gap-2.5 mb-3">
            <div
                className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[13px] font-medium flex-shrink-0"
                style={{ background: t.bg, color: t.color }}
            >
                {t.initials}
            </div>
            <div>
                <div className="flex items-center gap-1 text-[13.5px] font-medium text-[#2c2420]">
                    {t.name}
                    {t.verified && <VerifiedBadge />}
                </div>
                <div className="text-[12px] text-[#b5a090]">{t.handle}</div>
            </div>
        </div>

        {t.stars && <StarRating count={t.stars} />}

        {t.quote && (
            <div
                className="text-[28px] text-[#e8ddd4] leading-none mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
            >
                &ldquo;
            </div>
        )}

        <p className="text-[13.5px] text-[#5c4f47] leading-[1.65]">{t.text}</p>

        {t.tag && (
            <span className="inline-block mt-2.5 bg-[#f0e8df] text-[#c9917a] text-[10px] tracking-wide px-[9px] py-[3px] rounded-full font-medium">
                {t.tag}
            </span>
        )}
    </div>
);

const TestimonialsSection = () => {
    return (
        <section className="py-16 px-6 bg-[#faf7f2]">
            <div className="text-center mb-12">
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#b5a090] mb-3">
                    Customer Stories
                </p>
                <h2
                    className="text-4xl md:text-5xl font-black text-[#2c2420] leading-tight mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    Loved by thousands of people
                </h2>
                <p className="text-sm text-[#8a7b72]">
                    Here&apos;s what our customers have to say about RASHI KNITWEAR.
                </p>
            </div>

            <div className="max-w-[1300px] mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {testimonials.map((t, i) => (
                    <TestimonialCard key={i} t={t} />
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
