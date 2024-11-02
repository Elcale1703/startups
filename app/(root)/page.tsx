import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: "55",
      author: { _id: 1, name: "Moises" },
      _id: 1,
      description: "This is a description",
      image: "https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid",
      categoy: "Robots",
      title: "We Robots",
    }
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Starup, <br /> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitons.</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Starups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) =>(
              <StartupCard key={post?._id} post={post} />
            ))
          ): (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
