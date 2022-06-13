import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import AddInventoryPage from "./pages/AddInventoryPage/AddInventoryPage";
import EditInventoryPage from "./pages/EditInventoryPage/EditInventoryPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/warehouse" component={WarehousePage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/warehouse-add" component={AddWarehousePage} />
        <Route path="/warehouse-edit" component={EditWarehousePage} />
        <Route path="/inventory-add" component={AddInventoryPage} />
        <Route path="/inventory-edit" component={EditInventoryPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
