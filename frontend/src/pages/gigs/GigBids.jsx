import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

export default function GigBids() {
  const { gigId } = useParams();
  const [bids, setBids] = useState([]);
  const [gigAssigned, setGigAssigned] = useState(false);

  const loadBids = async () => {
    const res = await api.get(`/bids/${gigId}`);
    setBids(res.data);
    setGigAssigned(res.data.some((b) => b.status === "hired"));
  };

  useEffect(() => {
    loadBids();
  }, [gigId]);

  const hire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast.success("Freelancer hired successfully");
      loadBids();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to hire");
    }
  };

  return (
    <PageWrapper title={`Bids (${bids.length})`}>
      {bids.map((bid) => (
        <Card key={bid._id}>
          <h3 className="font-semibold">{bid.freelancerId.name}</h3>
          <p>₹{bid.price}</p>
          <StatusBadge status={bid.status} />

          {!gigAssigned && bid.status === "pending" && (
            <Button onClick={() => hire(bid._id)} className="mt-2">
              Hire
            </Button>
          )}

          {bid.status === "hired" && (
            <p className="text-green-600 mt-2 font-medium">
              ✅ Hired Candidate
            </p>
          )}
        </Card>
      ))}
    </PageWrapper>
  );
}
