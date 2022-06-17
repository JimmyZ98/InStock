import "./App.css";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import AddInventoryPage from "./pages/AddInventoryPage/AddInventoryPage";
import EditInventoryPage from "./pages/EditInventoryPage/EditInventoryPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import InventoryDetailsPage from "./pages/InventoryDetailsPage/InventoryDetailsPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect from='/' to='/warehouse' exact />
          <Route path="/warehouse" exact component={WarehousePage} />
          <Route path="/warehouse/add" component={AddWarehousePage} />
          <Route path="/warehouse/edit/:warehouseId" component={EditWarehousePage} />
          <Route path="/warehouse/:warehouseId" component={WarehouseDetailsPage} />
          <Route path="/inventory" exact component={InventoryPage} />
          <Route path="/inventory/add" component={AddInventoryPage} />
          <Route path="/inventory/edit/:warehouseId" component={EditInventoryPage} />
          <Route path="/inventory/:inventoryId" component={InventoryDetailsPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
