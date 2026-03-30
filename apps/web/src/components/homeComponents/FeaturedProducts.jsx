"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import Message from "../LoadingError/Error";

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/products?pageNumber=1", { cache: "no-store" });
        const raw = await res.text();
        const data = JSON.parse(raw);
        if (!res.ok) throw new Error(data?.message || "Failed to load products");
        if (!mounted) return;
        setProducts((data.products || []).slice(0, 6));
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load products");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="featuredSection">
      <div className="container">
        <div className="featuredHeader">
          <h2 className="featuredTitle">À la une</h2>
          <Link href="/products" className="featuredLink">
            Plus de produits →
          </Link>
        </div>

        {error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : loading ? (
          <div className="text-center py-4" style={{ color: "#666" }}>
            Chargement…
          </div>
        ) : (
          <div className="row shopcontainer">
            {products.map((p) => (
              <div className="shop col-lg-4 col-md-6 col-sm-6" key={p._id}>
                <div className="border-product productCard">
                  <Link href={`/products/${p._id}`}>
                    <div className="shopBack">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </Link>
                  <div className="shoptext">
                    <p className="productTitle">
                      <Link href={`/products/${p._id}`}>{p.name}</Link>
                    </p>
                    <Rating value={p.rating} text={`${p.numReviews} reviews`} />
                    <h3 className="productPrice">${p.price}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

