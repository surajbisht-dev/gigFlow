import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { Link } from "react-router-dom";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [bidCount, setBidCount] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/gigs/my");
      setGigs(res.data);

      const counts = {};
      for (const gig of res.data) {
        const bids = await api.get(`/bids/${gig._id}`);
        counts[gig._id] = bids.data.length;
      }
      setBidCount(counts);
    };

    load();
  }, []);

  return (
    <PageWrapper title="My Gigs">
      {/* when we don't have any gigs */}
      {gigs.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          You have not posted any gigs.
        </p>
      )}

      {/*  gig list here*/}
      {gigs.map((gig) => (
        <Card key={gig._id}>
          <h3 className="text-lg font-semibold">{gig.title}</h3>

          <div className="mt-1">
            <StatusBadge status={gig.status} />
          </div>

          <p className="mt-2">
            Total Bids: <strong>{bidCount[gig._id] || 0}</strong>
          </p>

          <Link
            to={`/bids/${gig._id}`}
            className="text-primary mt-3 inline-block"
          >
            View Bids
          </Link>
        </Card>
      ))}
    </PageWrapper>
  );
}
