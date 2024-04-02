import { useEffect, useState } from "react";
import "./AdminPage.css";
import UsersTable from "../../components/AdminTables/UsersTable";
import ProductsTable from "../../components/AdminTables/ProductsTable";

export default function AdminPage() {
  const [tab, setTab] = useState("users");

  return (
    <main>
      <div className="tab-buttons">
        <button id="users" onClick={(e) => setTab(e.target.id)}>
          Users
        </button>
        <button id="products" onClick={(e) => setTab(e.target.id)}>
          Products
        </button>
      </div>
      <div className="admin-content">
        {tab === "users" ? <UsersTable /> : <ProductsTable />}
      </div>
    </main>
  );
}
