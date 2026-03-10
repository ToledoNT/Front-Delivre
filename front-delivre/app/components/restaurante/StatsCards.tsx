interface StatsCardsProps {
  totalHoje: number;
  emPreparo: number;
  saiuEntrega: number;
  entregues: number;
}

export function StatsCards({ totalHoje, emPreparo, saiuEntrega, entregues }: StatsCardsProps) {
  const stats = [
    { label: "Hoje", value: totalHoje },
    { label: "Em preparo", value: emPreparo },
    { label: "Saiu p/ entrega", value: saiuEntrega },
    { label: "Entregues", value: entregues },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border flex flex-col items-center">
          <h3 className="font-semibold text-lg">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}