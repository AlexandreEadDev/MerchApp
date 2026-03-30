"use client";

import Link from "next/link";

export default function HeroNike() {
  return (
    <section className="heroNike">
      <div className="container">
        <div className="heroNikeInner">
          <div className="heroCopy">
            <span className="heroKicker">MerchX</span>
            <h1 className="heroTitle">Find your next pair.</h1>
            <p className="heroSubtitle">
              Une vitrine moderne de chaussures, pensée comme une expérience de
              catalogue rapide et agréable.
            </p>
            <div className="heroCtas">
              <Link href="/products" className="btnPrimary">
                Voir tous les produits
              </Link>
              <Link href="/search/baskets" className="btnSecondary">
                Explorer “baskets”
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

