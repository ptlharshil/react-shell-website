
export default function Footer({page_key}) {
  return (
    <>
      <footer
        style={{
          fontSize: "0.875rem",
          color: "#888",
          textAlign: "center",
          borderTop: "1px solid #eee",
          padding: "1rem 0",
        }}
      >
        <small>
          <p>&copy; 2025 EnergyRec. All rights reserved. | <button className="button-link" onClick={()=>{page_key("privacy")}} style={{textDecoration:"underline"}}>Privacy Policy</button></p>
        </small>
      </footer>
      <style>
        {`.button-link {
  background: none;
  border: none;
  color: #61DBFB;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font: inherit;
  transition: color 0.2s ease-in-out;
}

.button-link:hover {
  color: #0056b3;
}
`}
      </style>
      </>
  );
}
 