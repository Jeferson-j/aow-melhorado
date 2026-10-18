import type { ImageAsset, Polo, Responsavel } from "@/types/academy";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const image = (src: string, alt: string): ImageAsset => ({
  src: src.startsWith("/") ? `${basePath}${src}` : src,
  alt,
  width: 1200,
  height: 900,
});

export const academy = {
  name: "AOW Jiu-Jitsu",
  description:
    "Um espaço para treinar com propósito, construir confiança e evoluir dentro e fora do tatame.",
  whatsapp: "5521999999999",
  whatsappLoja: "5521900000000",
  instagram: "https://www.instagram.com/aow_jiu_jitsu?igsi=OXVzMHdnNjE5bmt0",
};
export const polos: Polo[] = [
  {
    name: "Polo Trindade",
    location: "Trindade, São Gonçalo.",
    address: "Rua Uberlândia nº 95 - Trindade, São Gonçalo - RJ",
    schedule:
      "Segunda e quarta  kids 1 das 18:00 as 19:00 Kids 2 das 19:00 as 20:20 Juvenil e adultos das 20:20 as 22:00",
    leader: "Prof. Radson Souza",
    description:
      "Nosso primeiro endereço. Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/fernando.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
  {
    name: "Polo Trindade",
    location: "Trindade, São Gonçalo.",
    address:
      "Avenida cidade de Campos 910 2° andar - Trindade, São Gonçalo - RJ",
    schedule:
      "Terça e quinta Kids das 18:30 as 20 Juvenil e adultos das 20:00 as 22:00",
    leader: "Prof. Jeferson Albuquerque ",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/jeferson.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
  {
    name: "Polo Porto Novo",
    location: "Porto Novo · São Gonçalo",
    address: "Rua Maria Rita 568 - Porto Novo, São Gonçalo - RJ.",
    schedule:
      "Kids- segunda e quarta 19:00 as 20:30 Juvenil e adultos terça, quinta e sexta 20:30 as 22:00",
    leader: "Prof.  Michael Coutinho",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/coutinho.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
  {
    name: "Polo Alcântara",
    location: "Alcântara · São Gonçalo",
    address: " Rua  Alagoas, 364 - Raul Veiga, São Gonçalo - RJ ",
    schedule:
      "Segunda terça e sexta Kids 19:00 as 20:00 Juvenil e adultos das 20:00 as 21:30",
    leader: "Prof. André Lopes",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [
      image("/images/andre-lopes.jpeg", "Treino de Jiu-Jitsu no tatame"),
    ],
  },
  {
    name: "Polo Sapê",
    location: " Sapê - Niterói Academia Top Fitness",
    address: "Estrada Washington Luis, 486 - Sapê, Niterói - RJ",
    schedule:
      "Segunda e quarta Horário: kids 18:00 a 19:00 juvenil e adultos 19:00 as 20:00",
    leader: "Prof.  Daniel Otoni",
    description:
      " Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/dani-sape.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
  {
    name: "Polo Fonseca",
    location: "Fonseca · Niterói",
    address:
      " Rua Teixeira de Freitas, 418 - Fonseca Sitio Monte das Oliveiras",
    schedule:
      "Terça e quinta Horário: 18:00 NoGi 19:00 Kids 20:00 Adolescentes e adultos",
    leader: "Prof. Daniel Otoni",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [
      image("/images/dani-fonseca.jpeg", "Treino de Jiu-Jitsu no tatame"),
    ],
  },
  {
    name: "Polo Ipiiba",
    location: "Ipiiba - São Gonçalo - Academia CoupleFit",
    address: "Avenida Francisco Azeredo Coutinho, 123 - Ipiiba - Rio do Ouro",
    schedule:
      "Quarta e sexta Horário kids das 18:30 as   19:30 Juvenil  e adultos 19:30 as 21:00",
    leader: "Prof. Daniel Otoni",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/ipiiba.jpeg", "Pessoa se preparando para treino")],
  },
  {
    name: "Polo  Mutondo",
    location: " Mutondo São Gonçalo",
    address: "Travessa Maria Alice, 121, Mutondo, São Gonçalo - RJ",
    schedule: "Kids 18:30 as 19:30 Juvenil e adultos 21:00 as 22:30",
    leader: "Prof. Daniel Neves",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/daniel-alves.jpeg", "Atleta em movimento")],
  },
  {
    name: "Polo Itauna",
    location: "Itauna São Gonçalo",
    address: " Rua Neri Xavier - s/n - Quadra Renovada Itaúna - Morro do céu.",
    schedule:
      "Segundas e quinta Horários: Kids 1 - 18:00 às 19:30 Kids 2 e Adolescentes: 19:30 às 21:30",
    leader: "Prof.Fernando Jefferson",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [
      image("/images/fernando.jpeg", "Pessoa se preparando para treino"),
    ],
  },
  {
    name: "Polo Mutuapira",
    location: "Mutuapira São Gonçalo",
    address: "Estr. Covanca da Conceição, 1086 - Mutua, São Gonçalo - RJ",
    schedule: "Segunda e quarta Kids 18:30 as 19:30",
    leader: "Prof.Anderson Nascimento ",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/anderson.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
  {
    name: "Polo  Alcântara",
    location: " Alcântara · São Gonçalo",
    address: "Rua Lindolfo Collor 86.(CT Caique Oliveira)",
    schedule:
      "Segunda/Quarta/ Sexta 09:00- Adultos 15:00- Adultos 18:00-Infantil (a partir de 06 anos) 19:00- Adulto/juvenil",
    leader: "Profs.Pedro Fonseca e Lucas Nascimento",
    description:
      "Um tatame aberto para quem está começando e para quem busca sua próxima graduação.",
    images: [image("/images/lucas.jpeg", "Treino de Jiu-Jitsu no tatame")],
  },
];
export const gallery: ImageAsset[] = [
  image(
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85",
    "Dupla treinando no tatame",
  ),
  image(
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",
    "Treino intenso",
  ),
  image(
    "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1000&q=85",
    "Atleta antes do treino",
  ),
  image(
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
    "Comunidade treinando",
  ),
  image(
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85",
    "Movimento e técnica",
  ),
];
export const responsavel: Responsavel = {
  name: "Radson Souza",
  rank: "Faixa-preta",
  experience: "15 anos de tatame",
  bio: "O Jiu-Jitsu me ensinou muito além da técnica: mostrou que a disciplina transforma destinos. Em 2023, fundei o projeto com um propósito claro: usar a arte suave para apoiar nossa comunidade, dando a crianças e adolescentes ferramentas para construírem um futuro melhor através do esporte. O que começou como um sonho de transformação social hoje se consolidou em uma grande e forte equipe de competição.",
  image: image(
    "/images/radson-memo.jpeg",
    "Radson souza, responsável pela academia",
  ),
};
