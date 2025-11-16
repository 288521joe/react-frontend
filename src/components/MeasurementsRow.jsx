import Card from "./Card";

export default function MeasurementsRow({ diameter1, diameter2, runout1, runout2 }) {
  return (
    <div className="grid grid-cols-8 gap-4">

      <Card title="Lower Limit 1">27.50</Card>
      <Card title="Upper Limit 1">28.50</Card>
      <Card title="Diameter 1">{diameter1}</Card>
      <Card title="Runout 1">{runout1}</Card>

      <Card title="Lower Limit 2">27.50</Card>
      <Card title="Upper Limit 2">28.50</Card>
      <Card title="Diameter 2">{diameter2}</Card>
      <Card title="Runout 2">{runout2}</Card>

    </div>
  );
}
