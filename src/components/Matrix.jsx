import Card from "./Card";

export default function Matrix() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Running Model">--</Card>
      <Card title="Model Name">--</Card>
      <Card title="LOT Mark">--</Card>
      <Card title="Total Parts">--</Card>
      <Card title="OK Parts">--</Card>
      <Card title="NG Parts">--</Card>
    </div>
  );
}
