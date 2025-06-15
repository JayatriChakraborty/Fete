
import MyTicketsList from "@/components/MyTicketsList";

const MyTickets = () => {
  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-sm flex justify-start items-center mb-6">
        <h1 className="text-2xl font-bold">My Tickets</h1>
      </div>

      <div className="w-full max-w-sm">
        <MyTicketsList />
      </div>
    </div>
  );
};

export default MyTickets;
