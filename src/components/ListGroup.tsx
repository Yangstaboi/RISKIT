function ListGroup() {
  let items = ["Desk", "Chair", "Table", "Keyboard", "Mouse"];
  items = [];

  if (items.length === 0) {
    return (
      <>
        <h1>List</h1>
        <p>no items found</p>
      </>
    );
  }
  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
        ;
      </ul>
    </>
  );
}

export default ListGroup;
