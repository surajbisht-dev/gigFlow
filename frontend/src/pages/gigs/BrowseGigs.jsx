import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function BrowseGigs() {
  const { userId } = useAuth();

  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const [bids, setBids] = useState({});

  // Fetch gigs with search filter (by title)
  useEffect(() => {
    api.get(`/gigs?search=${search}`).then((res) => setGigs(res.data));
  }, [search]);

  // Submit bid for a specific gig
  const submitBid = async (gigId) => {
    const bidData = bids[gigId];

    if (!bidData?.message || !bidData?.price) {
      toast.error("Please enter message and price");
      return;
    }

    try {
      await api.post("/bids", {
        gigId,
        message: bidData.message,
        price: bidData.price,
      });

      toast.success("Bid submitted successfully");

      setBids((prev) => ({
        ...prev,
        [gigId]: { message: "", price: "" },
      }));
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to submit bid");
    }
  };

  return (
    <PageWrapper title="Browse Gigs">
      {/*  Search Bar  */}

      <div className="mb-6 -mt-2">
        <Input
          placeholder="Search gigs by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary"
        />
      </div>

      {gigs.map((gig) => {
        const isOwner = gig.ownerId === userId;

        return (
          <Card key={gig._id}>
            <h3 className="text-lg font-semibold">{gig.title}</h3>
            <p className="text-sm text-gray-600">{gig.description}</p>
            <p className="text-sm mt-1">Budget: ₹{gig.budget}</p>

            {isOwner ? (
              <p className="text-red-600 mt-3 font-medium">
                You cannot bid on your own gig
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                <Input
                  placeholder="Bid message"
                  value={bids[gig._id]?.message || ""}
                  onChange={(e) =>
                    setBids((prev) => ({
                      ...prev,
                      [gig._id]: {
                        ...prev[gig._id],
                        message: e.target.value,
                      },
                    }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Price"
                  value={bids[gig._id]?.price || ""}
                  onChange={(e) =>
                    setBids((prev) => ({
                      ...prev,
                      [gig._id]: {
                        ...prev[gig._id],
                        price: e.target.value,
                      },
                    }))
                  }
                />

                <Button onClick={() => submitBid(gig._id)}>Place Bid</Button>
              </div>
            )}
          </Card>
        );
      })}

      {gigs.length === 0 && (
        <p className="text-gray-500 mt-6">No gigs found.</p>
      )}
    </PageWrapper>
  );
}
