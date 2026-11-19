export type AgendaItem = {
  time: string;
  label: string;
};

export type Edition = {
  number: number;
  title: string;
  date: string;
  venue: string;
  address: string;
  agenda: AgendaItem[];
  meetupUrl: string;
};

export const event: Edition = {
  number: 1,
  title: "Construimos en directo con IA agéntica",
  date: "2026-11-19T18:00:00+01:00",
  venue: "Edificio Rojo, CEBT (ILDEFE)",
  address: "Calle Santos Ovejero, 1, León",
  agenda: [
    { time: "18:00", label: "Decidimos entre todos qué construir." },
    { time: "18:15", label: "Construimos en directo y enseñamos el resultado." },
    { time: "19:30", label: "Networking." },
  ],
  meetupUrl: "https://www.meetup.com/leon-ai/events/316984200/",
};
