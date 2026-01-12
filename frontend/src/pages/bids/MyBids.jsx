import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";

export default function MyBids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api.get("/bids/my").then((res) => setBids(res.data));
  }, []);

  return (
    <PageWrapper title="My Bids">
      {bids.length === 0 && <p>No bids placed yet.</p>}

      {bids.map((bid) => (
        <Card key={bid._id}>
          <h3 className="font-semibold">{bid.gigId.title}</h3>
          <p>Bid Price: ₹{bid.price}</p>
          <StatusBadge status={bid.status} />

          {bid.status === "hired" && (
            <p className="text-green-600 mt-2 font-medium">
              🎉 You have been hired
            </p>
          )}
        </Card>
      ))}
    </PageWrapper>
  );
}
