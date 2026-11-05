import {
  a0 as z, a2 as R, a3 as E, a4 as V, a5 as H, a6 as S,
  a7 as r, a8 as X, a9 as F, aa as f, ab as G, ac as O,
  ad as l, af as A, ag as B, ah as W, ai as Y, aj as i,
  ak as v, al as q, am as J
} from "./DZyj3ghP.js";

const whatIDoItems = [
  { title: "Machine Learning & Deep Learning", slug: "ml-dl" },
  { title: "Autonomous AI Agents & Vector Search", slug: "agents" },
  { title: "Computer Vision & Edge Intelligence", slug: "cv-edge" },
  { title: "High-Performance WebGL & 3D Graphics", slug: "webgl-3d" },
  { title: "Full-Stack Platforms & Cloud MLOps", slug: "fullstack-mlops" }
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
  { title: "WebGL", slug: "webgl" },
  { title: "GSAP", slug: "gsap" },
  { title: "FastAPI", slug: "fastapi" },
  { title: "Docker", slug: "docker" },
  { title: "AWS", slug: "aws" },
  { title: "Google Cloud", slug: "gcp" },
  { title: "Azure", slug: "azure" }
];

const _ = 0.03, k = 0.55, re = 0.4;
const ue = {
  __name: "about",
  setup() {
    const { $folio: n, $resize: b, $event: $ } = z();
    const j = A(null), H1 = A(null), H2 = A(null);
    R(() => ({ title: "About — Shreyas M" }));
    const [x, w] = B();
    const [D, K] = B();
    const p = [], d = [];

    const y = () => {
      for (let e = 0; e < d.length; e++) {
        const t = d[e];
        if (!t?.material) continue;
        const u = x[e]?.getBoundingClientRect(), a = x[e + 1]?.getBoundingClientRect();
        if (!u || !a) continue;
        const o = Math.abs(u.top - a.top) < u.height * 0.75;
        S.set(t.material.uniforms.u_alpha, { value: o ? t.cssAlpha : 0 });
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
        if (H1.value) { const ht = await n.text(H1.value, { reveal: !1 }); ht && (p.push(ht), n.showText(ht, !0, 0)); } if (H2.value) { const ht = await n.text(H2.value, { reveal: !1 }); ht && (p.push(ht), n.showText(ht, !0, 0.2)); } for (const e of x) p.push(await n.text(e, { reveal: !1 }));
        for (const e of D) {
          const t = await n.text(e, { reveal: !1 });
          t && (t.pop = 0), d.push(t);
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
      n.dropTexts([...p, ...d]);
    });

    return (e, t) => {
      const u = Y;
      return i(), r("main", {
        ref_key: "root",
        ref: j,
        "data-gl-shield": "",
        class: "fixed inset-0 overflow-hidden"
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
            class: "cert-container mx-auto flex min-h-full max-w-[46rem] s:max-w-[92rem] flex-col content-center items-center justify-center px-20 gap-y-52 s:gap-y-64"
          }, [
            f("div", { class: "flex flex-col items-center w-full" }, [
              f("div", { ref_key: "h1", ref: H1, class: "about-heading pointer-events-none whitespace-nowrap leading-none tracking-[-0.04em] mb-24 s:mb-32 text-center w-full", style: "font-size:clamp(42px, 5.25vw, 63px);line-height:1;" }, "My Expertise"),
              f("div", {
                class: "flex flex-wrap content-center items-center justify-center",
                style: "column-gap: 32px !important; row-gap: 16px !important;"
              }, [
                (i(!0), r(G, null, O(whatIDoItems, (a, o) => (
                  i(), r("span", { key: a.slug, class: "relative flex" }, [
                    r("span", {
                      ref_for: !0,
                      ref: l(w),
                      class: "pointer-events-auto whitespace-nowrap text-18 s:text-28 leading-none tracking-[-0.04em]"
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
            f("div", { class: "about-tech-stack-section flex flex-col items-center w-full", style: "margin-top:clamp(44px, 8.5vw, 72px) !important;" }, [
              f("div", { ref_key: "h2", ref: H2, class: "about-heading pointer-events-none whitespace-nowrap leading-none tracking-[-0.04em] mb-24 s:mb-32 text-center w-full", style: "font-size:clamp(42px, 5.25vw, 63px);line-height:1;" }, "Tech Stack"),
              f("div", {
                class: "flex flex-wrap content-center items-center justify-center",
                style: "column-gap: 32px !important; row-gap: 16px !important;"
              }, [
                (i(!0), r(G, null, O(toolkitItems, (a, o) => (
                  i(), r("span", { key: a.slug, class: "relative flex" }, [
                    r("span", {
                      ref_for: !0,
                      ref: l(w),
                      class: "pointer-events-auto whitespace-nowrap text-18 s:text-28 leading-none tracking-[-0.04em]"
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
        ])
      ], 512);
    };
  }
};
export { ue as default };
