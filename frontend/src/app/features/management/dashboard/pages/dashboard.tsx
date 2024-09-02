import "../../../../styles/components/_dashboard.scss";
import ChartBlock from "../components/dashboard/dashboard-comp";
import { useTranslation } from "react-i18next";

// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import "./Dashboard.css";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants nécessaires pour Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#42A5F5",
    },
  ],
};

const barData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Exemples de données pour les graphiques
const userDistributionData = {
  labels: ["Group 1", "Group 2", "Group 3", "Group 4"],
  datasets: [
    {
      label: "Utilisateurs",
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81],
    },
  ],
};

const topProductsData = {
  labels: ["Produit A", "Produit B", "Produit C", "Produit D"],
  datasets: [
    {
      label: "Produits les plus vendus",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      data: [55, 65, 75, 85],
    },
  ],
};

const adminActivityData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Activité des admins",
      backgroundColor: "rgba(54,162,235,0.2)",
      borderColor: "rgba(54,162,235,1)",
      data: [30, 50, 40, 60, 70, 80],
      fill: true,
    },
  ],
};

const salesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Statistiques des ventes",
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40, 35, 50, 30, 55, 60],
    },
  ],
};

const expenseData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Coût moyen des dépenses",
      backgroundColor: "rgba(255,206,86,0.2)",
      borderColor: "rgba(255,206,86,1)",
      data: [
        1000, 1100, 1200, 1300, 900, 950, 1050, 1150, 1200, 1300, 1400, 1450,
      ],
    },
  ],
};

const AdminDashboard = () => {
  const { t } = useTranslation();

  window.document.title = t("MODULE_COMMON_SIDEBAR_DASHBOARD");
  return (
    <div className="h-full flex flex-col justify-start mx-auto dashboard px-2 w-full">
      <hr className="my-4 bg-gray-400 h-[1px]" />

      {/* Section pour les cartes */}
      <div className="cards-container">
        <div className="card">
          <h3>26 New Messages!</h3>
          <a href="#">View Details &rsaquo;</a>
        </div>
        <div className="card">
          <h3>11 New Tasks!</h3>
          <a href="#">View Details &rsaquo;</a>
        </div>
        <div className="card">
          <h3>123 New Orders!</h3>
          <a href="#">View Details &rsaquo;</a>
        </div>
        <div className="card">
          <h3>13 New Tickets!</h3>
          <a href="#">View Details &rsaquo;</a>
        </div>
      </div>

      {/* Graphiques */}
      <div className="charts-container">
        <div className="chart">
          <Line data={lineData} />
        </div>
        <div className="chart">
          <Bar data={barData} />
        </div>
        <div className="chart">
          <Line data={lineData} />
        </div>
        <div className="chart">
          <Bar data={barData} />
        </div>
      </div>

      <hr className="my-4 bg-gray-400 h-[1px]" />
      <ChartBlock title="Administrateurs">Test3</ChartBlock>

      <div className="dashboard">

        {/* Contenu du Dashboard */}
        <div className="dashboard-grid">
          {/* Section Utilisateurs */}
          <div className="card">
            <h3>Utilisateurs actifs</h3>
            <div className="active-users">1345</div>
          </div>

          <div className="card">
            <h3>Répartition des utilisateurs</h3>
            <Bar data={userDistributionData} />
          </div>

          {/* Section Produits */}
          <div className="card">
            <h3>Produits les plus vendus</h3>
            <Bar data={topProductsData} />
          </div>

          {/* Section Administrateurs */}
          <div className="card">
            <h3>Activité des administrateurs</h3>
            <Line data={adminActivityData} />
          </div>
          {/* 
        <div className="card">
          <h3>Répartition géographique des administrateurs</h3>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div> */}

          {/* Section Ventes */}
          <div className="card">
            <h3>Statistiques des ventes</h3>
            <Bar data={salesData} />
          </div>

          <div className="card">
            <h3>Coût moyen des dépenses</h3>
            <Bar data={expenseData} />
          </div>

          <div className="card recent-transactions">
            <h3>Transactions récentes</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>Produit</th>
                  <th>Paiement</th>
                  <th>Prix</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#Order-1944</td>
                  <td>John Doe</td>
                  <td>Watch</td>
                  <td>Credit Card</td>
                  <td>$120</td>
                  <td>Paid</td>
                </tr>
                {/* Ajoute d'autres transactions ici */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
