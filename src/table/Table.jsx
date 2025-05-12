import Row from "./Row";

export default function Table() {
  return (
    <table border="1">
        <tbody>
          <Row text="Satu" />
          <Row text="Dua" />
          <Row text="Tiga" />
        </tbody>
    </table>
  );
}