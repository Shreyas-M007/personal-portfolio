import {
  a0 as z, a2 as R, a3 as E, a4 as V, a5 as H, a6 as S,
  a7 as r, a8 as X, a9 as F, aa as f, ab as G, ac as O,
  ad as l, af as A, ag as B, ah as W, ai as Y, aj as i,
  ak as v, al as q, am as J
} from "./DZyj3ghP.js";

const whatIDoItems = [
  { title: "Machine Learning Operations & Deep Learning Architectures", slug: "mlops" },
  { title: "Autonomous AI Agents & Vector Search Solutions", slug: "agents" },
  { title: "High-Performance WebGL & Aerodynamic Simulation", slug: "webgl" },
  { title: "Modern Full-Stack Platforms", slug: "fullstack" },
  { title: "Computer Vision Systems", slug: "cv" }
];

const toolkitItems = [
  { title: "Python", slug: "python" },
  { title: "PyTorch", slug: "pytorch" },
  { title: "TensorFlow", slug: "tensorflow" },
  { title: "OpenCV", slug: "opencv" },
  { title: "TypeScript", slug: "typescript" },
  { title: "React", slug: "react" },
  { title: "Next.js", slug: "nextjs" },
  { title: "Nuxt", slug: "nuxt" },
  { title: "Three.js", slug: "threejs" },
  { title: "WebGL", slug: "webgl-tech" },
  { title: "GSAP", slug: "gsap" },
  { title: "FastAPI", slug: "fastapi" },
  { title: "Docker", slug: "docker" },
  { title: "Amazon Web Services", slug: "aws" },
  { title: "Google Cloud", slug: "gcp" },
  { title: "Microsoft Azure", slug: "azure" }
];

const _ = 0.03, k = 0.55, re = 0.4;
const ue = {
  __name: "about",
  setup() {
    const { $folio: n, $resize: b, $event: $ } = z();
    const j = A(null), H1 = A(null), H2 = A(null), T = A(null);
    R(() => ({ title: "About — Shreyas M" }));
    const [x, w] = B();
    const [D, K] = B();
    const p = [], d = [];
    const allItems = [...whatIDoItems, ...toolkitItems];
    const L = e => b.mouse && n.rail && n.rail.point(e.clientX, e.clientY);
    const c = (e, t) => t && b.mouse && n.rail && n.rail.pick(e);

    const y = () => {
      // 1. whatIDoItems (indices 0..3 in d, connecting word e and word e+1 in x)
      for (let e = 0; e < 4; e++) {
        const t = d[e];
        if (!t?.material) continue;
        const u = x[e]?.getBoundingClientRect(), a = x[e + 1]?.getBoundingClientRect();
        if (!u || !a) continue;
        const o = Math.abs(u.top - a.top) < Math.max(u.height, a.height) * 0.75;
        S.set(t.material.uniforms.u_alpha, { value: o ? (t.cssAlpha || 0.6) : 0 });
      }

      // 2. toolkitItems (indices 4..18 in d, where dot 4 connects x[5] and x[6])
      const wordOffset = 5;
      const dotOffset = 4;
      for (let j = 0; j < 15; j++) {
        const t = d[dotOffset + j];
        if (!t?.material) continue;
        const u = x[wordOffset + j]?.getBoundingClientRect();
        const a = x[wordOffset + j + 1]?.getBoundingClientRect();
        if (!u || !a) continue;
        const o = Math.abs(u.top - a.top) < Math.max(u.height, a.height) * 0.75;
        S.set(t.material.uniforms.u_alpha, { value: o ? (t.cssAlpha || 0.6) : 0 });
      }
    };

    let alive = true;
    E(() => alive = false);

    V(async () => {
      if (await H(), n.declare(), await n.booted, !!alive) {
        n.hideHome();
        n.scan(j.value);
        n.depart();
        n.fadeLeaving();

        // Parallelize rasterization of all text meshes so there is no freeze
        const [tH1, tH2, textsX, textsD] = await Promise.all([
          H1.value ? n.text(H1.value, { reveal: !1 }) : null,
          H2.value ? n.text(H2.value, { reveal: !1 }) : null,
          Promise.all(x.map(e => n.text(e, { reveal: !1 }))),
          Promise.all(D.map(e => n.text(e, { reveal: !1 })))
        ]);

        if (!alive) return;

        if (tH1) { p.push(tH1); n.showText(tH1, !0, 0); }
        if (tH2) { p.push(tH2); n.showText(tH2, !0, 0.15); }
        for (const t of textsX) { if (t) p.push(t); }
        for (const t of textsD) { if (t) { t.pop = 0; d.push(t); } }

        if (n.rail && T.value) {
          n.rail.bind(T.value, allItems);
        }
        p.forEach((e, t) => {
          n.showText(e, !0, Math.min(t * _, k));
        });
        y();
        $.on("resize", y);
        d.forEach((e, t) => {
          e && S.to(e, { pop: 1, duration: 0.5, delay: re + Math.min(t * _, k), ease: "back.out(1.7)", overwrite: "auto" });
        });
        n.staggerHud(Math.min(p.length * _, k), _);
        n.setScroll(0);
      }
    });

    E(() => {
      $.off("resize", y);
      if (n.rail) n.rail.bind(null);
      n.dropTexts([...p, ...d]);
    });

    return (e, t) => {
      const u = Y;
      return i(), r("main", {
        ref_key: "root",
        ref: j,
        "data-gl-shield": "",
        class: "fixed inset-0 overflow-hidden",
        onPointermove: L
      }, [
        X(u, null, {
          default: F(() => [
            f("h1", null, "About — Shreyas M"),
            f("p", null, "Technical Toolkit & What I Do")
          ]),
          _: 1
        }),
        f("div", { class: "absolute inset-0" }, [
          f("div", {
            class: "cert-container mx-auto flex min-h-full max-w-[46rem] s:max-w-[92rem] flex-col content-center items-center justify-center px-20 gap-y-36"
          }, [
            f("div", { class: "about-tech-stack-section flex flex-col items-center w-full" }, [
              f("h2", { ref_key: "h1", ref: H1, "data-gl": "text", class: "about-heading font-regular pointer-events-none whitespace-nowrap leading-none tracking-[-0.04em] mb-24 s:mb-32 text-center w-full" }, "My Expertise"),
              f("div", {
                class: "flex flex-wrap content-center items-center justify-center",
                style: "column-gap: 32px !important; row-gap: 16px !important;"
              }, [
                (i(!0), r(G, null, O(whatIDoItems, (a, o) => (
                  i(), r("span", { key: a.slug, class: "relative flex" }, [
                    r("span", {
                      ref_for: !0,
                      ref: l(w),
                      class: "pointer-events-auto cursor-pointer whitespace-nowrap text-18 s:text-28 leading-none tracking-[-0.04em]",
                      onPointerenter: s => c(o, !0),
                      onPointerleave: s => c(o, !1)
                    }, v(a.title), 513),
                    o < whatIDoItems.length - 1 ? (
                      i(), r("span", {
                        ref_for: !0,
                        ref: l(K),
                        class: "cert-dot-el pointer-events-none absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 text-8 leading-none",
                        style: "margin-left: 16px !important;",
                        "aria-hidden": "true"
                      }, "●", 512)
                    ) : J("", !0)
                  ])
                )), 128))
              ])
            ]),
            f("div", { class: "about-tech-stack-section flex flex-col items-center w-full" }, [
              f("h2", { ref_key: "h2", ref: H2, "data-gl": "text", class: "about-heading font-regular pointer-events-none whitespace-nowrap leading-none tracking-[-0.04em] mb-24 s:mb-32 text-center w-full" }, "Tech Stack"),
              f("div", {
                class: "flex flex-wrap content-center items-center justify-center",
                style: "column-gap: 32px !important; row-gap: 16px !important;"
              }, [
                (i(!0), r(G, null, O(toolkitItems, (a, o) => (
                  i(), r("span", { key: a.slug, class: "relative flex" }, [
                    r("span", {
                      ref_for: !0,
                      ref: l(w),
                      class: "pointer-events-auto cursor-pointer whitespace-nowrap text-18 s:text-28 leading-none tracking-[-0.04em]",
                      onPointerenter: s => c(whatIDoItems.length + o, !0),
                      onPointerleave: s => c(whatIDoItems.length + o, !1)
                    }, v(a.title), 513),
                    o < toolkitItems.length - 1 ? (
                      i(), r("span", {
                        ref_for: !0,
                        ref: l(K),
                        class: "cert-dot-el pointer-events-none absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 text-8 leading-none",
                        style: "margin-left: 16px !important;",
                        "aria-hidden": "true"
                      }, "●", 512)
                    ) : J("", !0)
                  ])
                )), 128))
              ])
            ])
          ])
        ]),
        f("div", { class: "pointer-events-none absolute inset-0" }, [
          f("div", { ref_key: "panel", ref: T, class: "h-200 w-0 rounded-20" }, null, 512)
        ])
      ], 512);
    };
  }
};
export { ue as default };
