
import "../../../../styles/components/_dashboard.scss";
import ChartBlock from "../components/dashboard/dashboard-comp";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();

  window.document.title = t("MODULE_COMMON_SIDEBAR_DASHBOARD");
  return (
    <div className="h-full flex flex-col justify-start mx-auto dashboard px-2 w-full">
      <ChartBlock title="Utilisateurs">
        Test1
      </ChartBlock>
      <hr className="my-4 bg-gray-400 h-[1px]" />
      <ChartBlock title="Produits">
        Test2
      </ChartBlock>
      <hr className="my-4 bg-gray-400 h-[1px]" />
      <ChartBlock title="Administrateurs">
        Test3
      </ChartBlock>
      <hr className="my-4 bg-gray-400 h-[1px]" />
      <ChartBlock title="Ventes">
        Test4
      </ChartBlock>

    </div>
  );
};

export default AdminDashboard;
