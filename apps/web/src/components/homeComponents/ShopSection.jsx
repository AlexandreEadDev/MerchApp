"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

function ProductCardSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div className="shop col-lg-4 col-md-6 col-sm-6" key={`sk-${idx}`}>
          <div className="border-product productCard">
            <div className="shopBack skeleton" />
            <div className="shoptext">
              <div className="skeletonLine w-75" />
              <div className="skeletonLine w-50 mt-2" />
              <div className="skeletonLine w-25 mt-3" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const initialPage = useMemo(() => {
    const p = Number(pagenumber);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [pagenumber]);

  const [filters, setFilters] = useState({
    size: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sort: "new",
    category: "",
    audience: "",
  });

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const sentinelRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (targetPage, { append }) => {
      const requestId = ++requestIdRef.current;
      try {
        append ? setLoadingMore(true) : setLoading(true);
        setError("");

        const qs = new URLSearchParams();
        if (keyword) qs.set("keyword", keyword);
        qs.set("pageNumber", String(targetPage));
        if (filters.size) qs.set("size", filters.size);
        if (filters.minPrice) qs.set("minPrice", filters.minPrice);
        if (filters.maxPrice) qs.set("maxPrice", filters.maxPrice);
        if (filters.minRating) qs.set("minRating", filters.minRating);
        if (filters.sort) qs.set("sort", filters.sort);

        const res = await fetch(`/api/products?${qs.toString()}`, {
          cache: "no-store",
        });
        const raw = await res.text();
        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(
            "API returned non-JSON. Check that /api/products is reachable and not returning an HTML error page."
          );
        }
        if (!res.ok) throw new Error(data?.message || "Failed to load products");

        if (requestId !== requestIdRef.current) return;

        const serverProducts = data.products || [];
        const normalizeText = (s) => String(s || "").toLowerCase();
        const withCategory = serverProducts.map((p) => {
          const n = normalizeText(p.name);
          const category =
            n.includes("bottin") ? "bottines" : n.includes("mocassin") ? "mocassins" : "baskets";
          const audience =
            n.includes("enfant") ? "enfant" : n.includes("femme") ? "femme" : n.includes("homme") ? "homme" : "";
          return { ...p, __category: category, __audience: audience };
        });

        const filteredClient = withCategory.filter((p) => {
          if (filters.category && p.__category !== filters.category) return false;
          if (filters.audience && p.__audience !== filters.audience) return false;
          return true;
        });

        setPage(data.page);
        setPages(data.pages);
        setItems((prev) => (append ? [...prev, ...filteredClient] : filteredClient));
      } catch (e) {
        if (requestId !== requestIdRef.current) return;
        setError(e?.message || "Failed to load products");
      } finally {
        if (requestId !== requestIdRef.current) return;
        append ? setLoadingMore(false) : setLoading(false);
      }
    },
    [keyword, filters]
  );

  // Reset when keyword changes
  useEffect(() => {
    setItems([]);
    setPage(initialPage);
    setPages(1);
    fetchPage(initialPage, { append: false });
  }, [fetchPage, initialPage]);

  // Reset when filters change
  useEffect(() => {
    setItems([]);
    setPage(1);
    setPages(1);
    fetchPage(1, { append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (loading || loadingMore) return;
    if (page >= pages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        fetchPage(page + 1, { append: true });
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchPage, loading, loadingMore, page, pages]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row mb-3">
            <div className="col-12">
              <div className="catalogFilters">
                <div className="filterGroup">
                  <label className="filterLabel">Catégorie</label>
                  <select
                    className="filterControl"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    <option value="">Toutes</option>
                    <option value="baskets">Baskets</option>
                    <option value="bottines">Bottines</option>
                    <option value="mocassins">Mocassins</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label className="filterLabel">Public</label>
                  <select
                    className="filterControl"
                    value={filters.audience}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, audience: e.target.value }))
                    }
                  >
                    <option value="">Tous</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="enfant">Enfant</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label className="filterLabel">Taille</label>
                  <select
                    className="filterControl"
                    value={filters.size}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, size: e.target.value }))
                    }
                  >
                    <option value="">Toutes</option>
                    {[...Array(10).keys()].map((i) => {
                      const s = 36 + i;
                      return (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="filterGroup">
                  <label className="filterLabel">Prix</label>
                  <div className="filterRow">
                    <input
                      className="filterControl"
                      inputMode="decimal"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, minPrice: e.target.value }))
                      }
                    />
                    <input
                      className="filterControl"
                      inputMode="decimal"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, maxPrice: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="filterGroup">
                  <label className="filterLabel">Note</label>
                  <select
                    className="filterControl"
                    value={filters.minRating}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, minRating: e.target.value }))
                    }
                  >
                    <option value="">Toutes</option>
                    <option value="4">4+ étoiles</option>
                    <option value="3">3+ étoiles</option>
                    <option value="2">2+ étoiles</option>
                    <option value="1">1+ étoile</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label className="filterLabel">Tri</label>
                  <select
                    className="filterControl"
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, sort: e.target.value }))
                    }
                  >
                    <option value="new">Nouveautés</option>
                    <option value="price-asc">Prix ↑</option>
                    <option value="price-desc">Prix ↓</option>
                    <option value="rating-desc">Note ↓</option>
                  </select>
                </div>

                <div className="filterGroup filterActions">
                  <button
                    className="btnSecondary"
                    type="button"
                    onClick={() =>
                      setFilters({
                        size: "",
                        minPrice: "",
                        maxPrice: "",
                        minRating: "",
                        sort: "new",
                        category: "",
                        audience: "",
                      })
                    }
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : loading ? (
                  <ProductCardSkeleton count={6} />
                ) : (
                  <>
                    {items.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product productCard">
                          <Link href={`/products/${product._id}`}>
                            <div className="shopBack">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                                style={{ objectFit: "contain" }}
                                priority={false}
                              />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p className="productTitle">
                              <Link href={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                            <h3 className="productPrice">${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* Loading more */}
                {!error && !loading && (
                  <div className="col-12 d-flex justify-content-center my-3">
                    {loadingMore ? (
                      <div className="d-flex align-items-center gap-2">
                        <Loading />
                        <span style={{ color: "#666" }}>Loading more…</span>
                      </div>
                    ) : page < pages ? (
                      <span style={{ color: "#666" }}>
                        Scroll to load more
                      </span>
                    ) : (
                      <span style={{ color: "#666" }}>
                        You’ve reached the end
                      </span>
                    )}
                  </div>
                )}
                <div ref={sentinelRef} className="col-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
