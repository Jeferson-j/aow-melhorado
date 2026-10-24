"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AtSign,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import { academy, gallery, polos, responsavel } from "@/data/academy";
import { getWazeUrl } from "@/lib/waze";
function Button({
  children,
  href,
  variant = "red",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "red" | "dark" | "line";
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const className = `btn btn-${variant}`;

  return href ? (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

const carouselImages = polos
  .flatMap((polo) => polo.images.map((image) => ({ image, polo })))
  .slice(0, 11);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBase = (src: string) =>
  src.startsWith("/") && !src.startsWith(`${basePath}/`)
    ? `${basePath}${src}`
    : src;
const competitionImages = [
  {
    src: `${basePath}/competicoes/01-rio-international-cup-podio.jpg`,
    alt: "Dois atletas no pódio do Rio International Cup, segurando as medalhas",
    title: "Rio International Cup",
    detail: "Victor Miranda campeão",
  },
  {
    src: `${basePath}/competicoes/02-world-championship-1lugar.jpg`,
    alt: "Atleta sentada no pódio do 1º lugar do World Jiu-Jitsu Championship, com medalha de ouro",
    title: "World Jiu-Jitsu Championship",
    detail: "Atleta Esther campeã",
  },
  {
    src: `${basePath}/competicoes/03-rio-winter-open-2026-ouro.jpg`,
    alt: "Atleta de kimono preto e faixa azul mostrando a medalha de ouro do Rio Winter International Open 2026",
    title: "Rio Winter International Open · Ouro",
    detail: "Jaline Cunha campeã",
  },
  {
    src: `${basePath}/competicoes/04-mundial-cbjjo-2026-1lugar.jpg`,
    alt: "Atleta de kimono preto no pódio do 1º lugar do Campeonato Mundial 2026, segurando a medalha",
    title: "Campeonato Mundial CBJJO · 1º lugar",
    detail: "Giovana Braga campeã",
  },
  {
    src: `${basePath}/competicoes/05-brasileiro-criancas-2026-ouro.jpg`,
    alt: "Atleta sentada no pódio do Brasileiro de Jiu-Jitsu Crianças 2026 com duas medalhas de ouro",
    title: "Brasileiro de Crianças CBJJ · Ouro",
    detail: "Isa Lopes campeã Brasileira",
  },
  {
    src: `${basePath}/competicoes/06-brasileiro-cbjjo-2026-ouro.jpg`,
    alt: "Atleta de kimono branco sentado no pódio do Campeonato Brasileiro 2026 com medalha de ouro",
    title: "Campeonato Brasileiro CBJJO · Ouro",
    detail: "Rhavi Gomes campeão Brasileiro",
  },
  {
    src: `${basePath}/competicoes/07-rio-winter-ouro-dupla.jpg`,
    alt: "Dois atletas da equipe mostrando as medalhas de ouro do Rio Winter",
    title: "Rio Winter · Ouro",
    detail: "Irmãos oliveira",
  },
  {
    src: `${basePath}/competicoes/08-brasileiro-criancas-2024-ouro.jpg`,
    alt: "Atleta de kimono branco com o patch da equipe sorrindo com a medalha de ouro do Brasileiro de Crianças 2024",
    title: "Brasileiro de Crianças CBJJ · Ouro",
    detail: "Gabriela Miranda campeã Brasileira",
  },
  {
    src: `${basePath}/competicoes/09-arena-medalha-ouro-faixa-azul.jpg`,
    alt: "Atleta de kimono preto e faixa azul mostrando a medalha de ouro dentro da arena do campeonato",
    title: "Campeão AJP",
    detail: "Arthur Caleb",
  },
  {
    src: `${basePath}/competicoes/10-mundial-cbjjo-2026-prata.jpg`,
    alt: "Atleta de kimono branco no pódio do 2º lugar do Campeonato Mundial 2026, com medalha de prata",
    title: "Campeonato Mundial CBJJO · Prata",
    detail: "Beatriz vice-campeã",
  },
  {
    src: `${basePath}/competicoes/11-brasileiro-cbjjo-2026-medalhista.jpg`,
    alt: "Atleta de kimono preto sentado no pódio do Campeonato Brasileiro 2026 com a medalha",
    title: "Campeonato Brasileiro CBJJO",
    detail: "Guilherme campão Brasileiro",
  },
  {
    src: `${basePath}/competicoes/12-medalha-ouro-por-do-sol.jpg`,
    alt: "Atleta de kimono preto mostrando a medalha de ouro ao entardecer",
    title: "Vice-campeã Sulamericano",
    detail: "Atleta Aida",
  },
];

const SHOP_INTERVAL = 6000; // tempo de cada peça na tela, em milissegundos

const lojaLink = (produto: string) =>
  `https://wa.me/${academy.whatsappLoja}?text=${encodeURIComponent(
    `Olá! Vi "${produto}" no site da ${academy.name} e gostaria de mais informações.`,
  )}`;

// TROQUE as fotos, descrições, tamanhos e valores pelos reais
// TROQUE os valores (R$ 0,00) e confira os tamanhos de cada peça
const produtos = [
  {
    category: "Kimono",
    name: "Kimono Preto infantil",
    detail: "Preto, com o patch AOW Jiu-Jitsu no peito e nas mangas.",
    src: `${basePath}/produtos/01-kimono-preto.jpg`,
    alt: "Atleta de kimono preto com faixa amarela, patch AOW Jiu-Jitsu no peito e nas mangas",
    sizes: ["A0", "A1", "A2", "A3", "A4", "A5"],
    price: "R$ 330,00",
  },
  {
    category: "Kimono",
    name: "Kimono Branco adulto",
    detail: "Branco, com patches AOW no peito e nas mangas e logo na calça.",
    src: `${basePath}/produtos/02-kimono-branco.jpg`,
    alt: "Atleta de kimono branco com faixa amarela e patches AOW no peito, nas mangas e na calça",
    sizes: ["A0", "A1", "A2", "A3", "A4", "A5"],
    price: "R$ 350,00",
  },
  {
    category: "Kimono infantil",
    name: "Kimono Infantil Branco",
    detail: "Branco, com patches AOW no peito e nas mangas.",
    src: `${basePath}/produtos/03-kimono-infantil-branco.jpg`,
    alt: "Criança de kimono branco com faixa cinza e patches AOW no peito e nas mangas",
    sizes: ["M0", "M1", "M2", "M3", "M4"],
    price: "R$ 330,00",
  },
  {
    category: "Kimono infantil",
    name: "Kimono Infantil Preto",
    detail: "Preto, com AOW em branco no peito e nas mangas.",
    src: `${basePath}/produtos/04-kimono-infantil-preto.jpg`,
    alt: "Criança de kimono preto com faixa cinza e AOW em branco no peito e nas mangas",
    sizes: ["M0", "M1", "M2", "M3", "M4"],
    price: "R$ 330,00",
  },
  {
    category: "Rashguard",
    name: "Rashguard ",
    detail: "Manga curta, com AOW Jiu-Jitsu no peito e Art of War nas mangas.",
    src: `${basePath}/produtos/05-rashguard-preta-01.jpg`,
    alt: "Atleta de rashguard preta de manga curta com AOW Jiu-Jitsu no peito",
    sizes: ["P", "M", "G", "GG"],
    price: "R$ 80,00",
  },
  {
    category: "Rashguard",
    name: "Rashguard ",
    detail: "Manga curta, com AOW Jiu-Jitsu no peito e Art of War nas mangas.",
    src: `${basePath}/produtos/06-rashguard-preta-02.jpg`,
    alt: "Atleta de rashguard preta com AOW Jiu-Jitsu no peito e faixa amarela",
    sizes: ["P", "M", "G", "GG"],
    price: "R$ 80,00",
  },
  {
    category: "Rashguard",
    name: "Rashguard ",
    detail: "Manga curta, com AOW Jiu-Jitsu no peito e Art of War nas mangas.",
    src: `${basePath}/produtos/07-rashguard-preta-03.jpg`,
    alt: "Atleta de rashguard preta com AOW Jiu-Jitsu no peito e faixa verde",
    sizes: ["P", "M", "G", "GG"],
    price: "R$ 80,00",
  },
  {
    category: "Rashguard",
    name: "Rashguard · Equipe",
    detail: "A rashguard da equipe AOW Jiu-Jitsu em diferentes tamanhos.",
    src: `${basePath}/produtos/08-rashguard-equipe.jpg`,
    alt: "Grupo de seis atletas da equipe usando a rashguard preta da AOW Jiu-Jitsu",
    sizes: ["P", "M", "G", "GG"],
    price: "R$ 80,00",
  },
];

export default function Home() {
  const nomeResponsavel = responsavel.name.trim().split(/\s+/);
  const [menu, setMenu] = useState(false);
  const [polo, setPolo] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [compIndex, setCompIndex] = useState(0);
  const compTouchX = useRef<number | null>(null);
  const [prodIndex, setProdIndex] = useState(0);
  const prodTouchX = useRef<number | null>(null);

  const goToProd = (index: number) => {
    const total = produtos.length;
    setProdIndex(((index % total) + total) % total);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProdIndex((current) => (current + 1) % produtos.length);
    }, SHOP_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [prodIndex]);
  const [snapCount, setSnapCount] = useState(carouselImages.length);
  const whatsapp = `https://wa.me/${academy.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de conhecer a academia.")}`;
  const goToContact = () => {
    document.getElementById("contato")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const goToComp = (index: number) => {
    const total = competitionImages.length;
    setCompIndex(((index % total) + total) % total);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCompIndex((current) => (current + 1) % competitionImages.length);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [compIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setPolo(emblaApi.selectedScrollSnap());
    const onReInit = () => setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.scrollTo(0, true);
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);
  const selectPolo = (index: number) => {
    setPolo(index);
    emblaApi?.scrollTo(index);
  };
  const previousPolo = (polo - 1 + snapCount) % snapCount;
  const nextPolo = (polo + 1) % snapCount;
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  return (
    <div>
      <main>
        <header className="header  ">
          <a href="#inicio" className="brand ">
            <Image
              src={`${basePath}/logo-aow.png`}
              alt="AOW Jiu-Jitsu"
              width={52}
              height={52}
              className="brand-logo"
            />
            <span>
              {academy.name}
              <small>JIU-JITSU BRASILEIRO</small>
            </span>
          </a>
          {menu && (
            <button
              className="menu-overlay"
              aria-label="Fechar menu"
              onClick={() => setMenu(false)}
            />
          )}
          <nav id="site-navigation" className={menu ? "nav open" : "nav"}>
            <a href="#inicio" onClick={() => setMenu(false)}>
              Início
            </a>
            <a href="#polos" onClick={() => setMenu(false)}>
              Polos
            </a>
            <a href="#sobre" onClick={() => setMenu(false)}>
              Sobre
            </a>
            <a href="#contato" onClick={() => setMenu(false)}>
              Contato
            </a>
            <Button href="#polos" variant="red">
              Conheça nossos polos
            </Button>
          </nav>
          <button
            className="menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="site-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </header>

        <section id="inicio" className="hero">
          <picture>
            <source
              media="(min-width: 430px)"
              srcSet={`${basePath}/images/banner-desktop.jpeg`}
            />

            <img
              src={`${basePath}/images/banner.jpeg`}
              alt="Atletas da AOW Jiu-Jitsu no tatame"
              className="hero-image"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-shade" />
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow light">DESDE 2023 · Brasil</p>
            <h1 className="display">
              O corpo aprende.
              <br />
              <em>A mente evolui.</em>
            </h1>
            <p className="hero-copy">
              Jiu-Jitsu para todos os corpos, todas as histórias e todos os
              próximos passos.
            </p>
            <div className="hero-actions">
              <Button href="#polos" variant="red">
                Encontrar um polo <ArrowRight size={17} />
              </Button>
              <Button href={whatsapp} variant="line">
                {" "}
                <MessageCircle size={17} /> Falar no WhatsApp
              </Button>
            </div>
          </motion.div>
          <a href="#polos" className="scroll-cue">
            <span>ROLE PARA EXPLORAR</span>
            <ArrowDown size={16} />
          </a>
          <div className="hero-stamp">
            DISCIPLINA
            <br />
            <span>·</span> RESPEITO
            <br />
            <span>·</span> EVOLUÇÃO
          </div>
        </section>

        <section id="polos" className="section locations">
          <div className="section-head">
            <div>
              <p className="eyebrow">ONDE TREINAR</p>
              <h2 className="display">
                Encontre seu <em>tatame.</em>
              </h2>
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Imagem anterior"
                onClick={() => selectPolo(previousPolo)}
              >
                <ArrowLeft size={18} />
              </button>
              <span>
                <span aria-live="polite">
                  {String(polo + 1).padStart(2, "0")}
                </span>{" "}
                <i>/ {String(snapCount).padStart(2, "0")}</i>
              </span>
              <button
                aria-label="Próxima imagem"
                onClick={() => selectPolo(nextPolo)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div
            className="polo-window"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Polos da academia"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                selectPolo(previousPolo);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                selectPolo(nextPolo);
              }
            }}
          >
            <div className="polo-track">
              {carouselImages.map((item, index) => (
                <div className="polo-slide" key={`${item.polo.name}-${index}`}>
                  <article
                    className="polo-card"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Imagem ${index + 1} de ${carouselImages.length}`}
                  >
                    <div
                      className="polo-photo polo-clickable"
                      role="link"
                      tabIndex={0}
                      onClick={goToContact}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          goToContact();
                        }
                      }}
                    >
                      <Image
                        src={withBase(item.image.src)}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 700px) 100vw, 45vw"
                        style={
                          index === 9 || index === carouselImages.length - 1
                            ? { objectFit: "contain", objectPosition: "center" }
                            : undefined
                        }
                      />

                      <span>
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {item.polo.name.toUpperCase()}
                      </span>
                    </div>

                    <div
                      className="polo-info polo-clickable"
                      role="link"
                      tabIndex={0}
                      onClick={goToContact}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          goToContact();
                        }
                      }}
                    >
                      <p className="eyebrow">{item.polo.location}</p>

                      <h3 className="display">{item.polo.name}</h3>

                      <p>{item.polo.description}</p>

                      <dl>
                        <div>
                          <dt>ENDEREÇO</dt>
                          <dd>
                            <MapPin size={14} />
                            {item.polo.address}
                          </dd>
                        </div>

                        <div>
                          <dt>HORÁRIOS</dt>
                          <dd>{item.polo.schedule}</dd>
                        </div>

                        <div>
                          <dt>RESPONSÁVEL</dt>
                          <dd>{item.polo.leader}</dd>
                        </div>
                      </dl>

                      <Button
                        href={getWazeUrl(item.polo.address)}
                        variant="dark"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Abrir no Waze <ArrowRight size={16} />
                      </Button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <p className="carousel-hint">Deslize para conhecer os polos</p>
          <div className="dots">
            {Array.from({ length: snapCount }, (_, index) => (
              <button
                key={index}
                aria-label={`Ir para a imagem ${index + 1}`}
                className={index === polo ? "active" : ""}
                onClick={() => selectPolo(index)}
              />
            ))}
          </div>
        </section>

        <section id="competicoes" className="section competitions">
          <div className="section-head">
            <div>
              <p className="eyebrow">NOSSA EQUIPE</p>
              <h2 className="display">
                Força nas <em>competições.</em>
              </h2>
              <p className="section-note">
                Atletas preparados, pódios conquistados e uma equipe que compete
                de verdade.
              </p>
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Foto anterior"
                onClick={() => goToComp(compIndex - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <span aria-live="polite">
                {String(compIndex + 1).padStart(2, "0")}{" "}
                <i>/ {String(competitionImages.length).padStart(2, "0")}</i>
              </span>
              <button
                aria-label="Próxima foto"
                onClick={() => goToComp(compIndex + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div
            className="comp-window"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Fotos das competições"
            onTouchStart={(event) => {
              compTouchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (compTouchX.current === null) return;
              const diff = event.changedTouches[0].clientX - compTouchX.current;
              compTouchX.current = null;
              if (Math.abs(diff) > 50)
                goToComp(compIndex + (diff < 0 ? 1 : -1));
            }}
          >
            <div className="comp-track">
              {competitionImages.map((item, index) => {
                const total = competitionImages.length;
                const offset =
                  ((((index - compIndex + total / 2) % total) + total) %
                    total) -
                  total / 2;

                return (
                  <figure
                    className="comp-slide"
                    key={item.src}
                    aria-hidden={index !== compIndex}
                    style={{
                      transform: `translateX(${offset * 100}%)`,
                      visibility: Math.abs(offset) > 1 ? "hidden" : "visible",
                    }}
                  >
                    <div className="comp-photo">
                      <Image
                        src={item.src}
                        alt=""
                        aria-hidden
                        fill
                        unoptimized
                        sizes="20vw"
                        className="comp-photo-bg"
                        loading={
                          index === 0 || Math.abs(offset) <= 1
                            ? "eager"
                            : "lazy"
                        }
                      />
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 700px) 100vw, 380px"
                        className="comp-photo-main"
                        loading={
                          index === 0 || Math.abs(offset) <= 1
                            ? "eager"
                            : "lazy"
                        }
                      />
                    </div>
                    <figcaption className="comp-info">
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="dots">
            {competitionImages.map((item, index) => (
              <button
                key={item.src}
                aria-label={`Ir para a foto ${index + 1}`}
                className={index === compIndex ? "active" : ""}
                onClick={() => goToComp(index)}
              />
            ))}
          </div>
        </section>

        <section id="loja" className="section gallery-section shop">
          <div className="section-head">
            <div>
              <p className="eyebrow">LOJA AOW</p>
              <h2 className="display">
                Kimonos e rashguards <em>à venda.</em>
              </h2>
              <p className="section-note">
                Veja os modelos, os tamanhos e os valores e fale direto com a
                nossa secretaria pelo WhatsApp.
              </p>
            </div>
            <div className="carousel-controls">
              <button
                aria-label="Produto anterior"
                onClick={() => goToProd(prodIndex - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <span aria-live="polite">
                {String(prodIndex + 1).padStart(2, "0")}{" "}
                <i>/ {String(produtos.length).padStart(2, "0")}</i>
              </span>
              <button
                aria-label="Próximo produto"
                onClick={() => goToProd(prodIndex + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div
            className="comp-window"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Kimonos e rashguards"
            onTouchStart={(event) => {
              prodTouchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (prodTouchX.current === null) return;
              const diff = event.changedTouches[0].clientX - prodTouchX.current;
              prodTouchX.current = null;
              if (Math.abs(diff) > 50)
                goToProd(prodIndex + (diff < 0 ? 1 : -1));
            }}
          >
            <div className="comp-track">
              {produtos.map((item, index) => {
                const total = produtos.length;
                const offset =
                  ((((index - prodIndex + total / 2) % total) + total) %
                    total) -
                  total / 2;

                return (
                  <figure
                    className="comp-slide"
                    key={item.name}
                    aria-hidden={index !== prodIndex}
                    style={{
                      transform: `translateX(${offset * 100}%)`,
                      visibility: Math.abs(offset) > 1 ? "hidden" : "visible",
                    }}
                  >
                    <div className="comp-photo">
                      <Image
                        src={item.src}
                        alt=""
                        aria-hidden
                        fill
                        unoptimized
                        sizes="20vw"
                        className="comp-photo-bg"
                        loading={
                          index === 0 || Math.abs(offset) <= 1
                            ? "eager"
                            : "lazy"
                        }
                      />
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 700px) 100vw, 380px"
                        className="comp-photo-main"
                        loading={
                          index === 0 || Math.abs(offset) <= 1
                            ? "eager"
                            : "lazy"
                        }
                      />
                    </div>
                    <figcaption className="comp-info">
                      <p className="prod-category">{item.category}</p>
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                      <dl className="prod-meta">
                        <div>
                          <dt>TAMANHOS</dt>
                          <dd>
                            <ul className="prod-sizes">
                              {item.sizes.map((size) => (
                                <li key={size}>{size}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div>
                          <dt>VALOR</dt>
                          <dd className="prod-price">{item.price}</dd>
                        </div>
                      </dl>
                      <a
                        className="btn btn-red"
                        href={lojaLink(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={index === prodIndex ? 0 : -1}
                      >
                        <MessageCircle size={17} /> Pedir pelo WhatsApp
                      </a>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="dots">
            {produtos.map((item, index) => (
              <button
                key={item.name}
                aria-label={`Ir para ${item.name}`}
                className={index === prodIndex ? "active" : ""}
                onClick={() => goToProd(index)}
              />
            ))}
          </div>
        </section>

        <section id="sobre" className="section about">
          <div className="about-image">
            <Image
              src={withBase(responsavel.image.src)}
              alt={responsavel.image.alt}
              fill
              sizes="(max-width: 700px) 100vw, 42vw"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">QUEM GUIA A JORNADA</p>
            <h2 className="display">
              {nomeResponsavel[0]}
              <br />
              <em>{nomeResponsavel.slice(1).join(" ")}.</em>
            </h2>
            <p className="rank">
              {responsavel.rank} <span>/</span> {responsavel.experience}
            </p>
            <p className="bio">{responsavel.bio}</p>
            <div className="values">
              <span>
                01 <b>DISCIPLINA</b>
              </span>
              <span>
                02 <b>RESPEITO</b>
              </span>
              <span>
                03 <b>TÉCNICA</b>
              </span>
              <span>
                04 <b>EVOLUÇÃO</b>
              </span>
            </div>
          </div>
        </section>

        <section id="contato" className="contact">
          <div>
            <p className="eyebrow light">PRIMEIRO PASSO</p>
            <h2 className="display">
              Sua primeira aula
              <br />
              começa aqui.
            </h2>
            <p>Venha conhecer o tatame, a metodologia e a comunidade.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const form = event.currentTarget;

              if (!form.checkValidity()) {
                setFormError("Preencha seu nome e escolha um polo.");
                form.reportValidity();
                return;
              }

              const formData = new FormData(form);
              const name = String(formData.get("name") ?? "").trim();
              const polo = String(formData.get("polo") ?? "").trim();

              const message = `Olá, sou o ${name} e gostaria de saber mais sobre o ${polo}`;

              const whatsappUrl = `https://wa.me/${
                academy.whatsapp
              }?text=${encodeURIComponent(message)}`;

              window.location.assign(whatsappUrl);
            }}
            className="contact-form"
          >
            <label>
              SEU NOME
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
              />
            </label>

            <label>
              POLO DE INTERESSE
              <select
                defaultValue=""
                required
                name="polo"
                aria-describedby="form-error"
              >
                <option value="" disabled>
                  Escolha um polo
                </option>

                {polos.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <button className="form-submit" type="submit">
              Falar no WhatsApp <MessageCircle size={18} />
            </button>

            {formError && (
              <p id="form-error" className="form-error" role="alert">
                {formError}
              </p>
            )}
          </form>
        </section>

        <footer className="footer">
          <div className="brand">
            <Image
              src={`${basePath}/logo-aow.png`}
              alt="AOW Jiu-Jitsu"
              width={52}
              height={52}
              className="brand-logo"
            />
            <span>
              {academy.name}
              <small>JIU-JITSU BRASILEIRO</small>
            </span>
          </div>
          <div className="footer-links">
            <a href="#polos">Polos</a>
            <a href="#sobre">Sobre</a>
            <a href={academy.instagram} target="_blank" rel="noreferrer">
              <AtSign size={16} /> Instagram
            </a>
          </div>
          <div className="footer-contact">
            <a href={whatsapp}>
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <div className="copyright">
            © 2024 {academy.name}. Todos os direitos reservados.
          </div>
        </footer>
        {lightbox !== null && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Imagem ampliada"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Fechar imagem"
              onClick={() => setLightbox(null)}
            >
              <X />
            </button>
            <Image
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              width={1200}
              height={900}
            />
          </div>
        )}
      </main>
    </div>
  );
}
