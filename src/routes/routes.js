import Dashboard from "../components/dashboard";
import MainLayout from "../components/mainLayout";
import TicketManagement from "../components/tickets";

export const routes = [
  {
    path: "/",
    element: <MainLayout children={<Dashboard />} />,
  },
  {
    path: "/tickets",
    element: <MainLayout children={<TicketManagement />} />,
  },
];
