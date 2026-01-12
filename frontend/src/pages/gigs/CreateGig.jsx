import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function CreateGig() {
  const [gig, setGig] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/gigs", gig);
      toast.success("Gig created successfully");
      setGig({ title: "", description: "", budget: "" });
    } catch {
      toast.error("Failed to create gig");
    }
  };

  return (
    <PageWrapper title="Post a Gig">
      <form onSubmit={submit} className="max-w-lg space-y-3">
        <Input
          placeholder="Title"
          value={gig.title}
          onChange={(e) => setGig({ ...gig, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={gig.description}
          onChange={(e) => setGig({ ...gig, description: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Budget"
          value={gig.budget}
          onChange={(e) => setGig({ ...gig, budget: e.target.value })}
        />
        <Button type="submit">Create Gig</Button>
      </form>
    </PageWrapper>
  );
}
