// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { mockPolls } from '@/data/mock-polls';

// export default function Home() {
//   // Get the 3 most recent polls for the showcase
//   const recentPolls = [...mockPolls]
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//     .slice(0, 3);

//   return (
//     <div className="container max-w-screen-xl mx-auto py-8 space-y-12 bg-amber-700">
//       {/* Hero Section */}
//       <section className="relative py-20 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center space-y-8 bg-cover bg-center" style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 space-y-4 max-w-3xl text-white">
//           <div className="space-y-4 max-w-3xl">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
//             Create and Share Interactive Polls
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-200">
//             Polly makes it easy to create polls, gather opinions, and analyze results in real-time.
//           </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button size="lg" asChild>
//               <Link href="/polls/create">Create a Poll</Link>
//             </Button>
//             <Button size="lg" variant="outline" asChild>
//               <Link href="/polls">Browse Polls</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 space-y-12">
//         <div className="text-center space-y-4 mb-8">
//           <h2 className="text-3xl font-bold">Why Choose Polly?</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Our platform offers everything you need to create engaging polls and get meaningful insights.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Easy to Create</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Create beautiful polls in seconds with our intuitive interface. No technical skills required.</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Real-time Results</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Watch votes come in and see results update instantly. Share results with participants.</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Secure & Private</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Control who can access your polls. Set expiration dates and manage permissions.</p>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Recent Polls Section */}
//       <section className="py-16 md:py-24 space-y-12">
//         <div className="flex justify-between items-end">
//           <div className="space-y-2">
//             <h2 className="text-3xl font-bold">Recent Polls</h2>
//             <p className="text-muted-foreground">Check out some of the latest polls from our community</p>
//           </div>
//           <Button variant="outline" asChild>
//             <Link href="/polls">View All</Link>
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {recentPolls.map((poll) => (
//             <Card key={poll.id} className="flex flex-col">
//               <CardHeader>
//                 <CardTitle className="line-clamp-2">{poll.title}</CardTitle>
//                 {poll.description && (
//                   <CardDescription className="line-clamp-2">{poll.description}</CardDescription>
//                 )}
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 <p className="text-sm text-muted-foreground">{poll.totalVotes} votes</p>
//               </CardContent>
//               <CardFooter>
//                 <Button asChild className="w-full">
//                   <Link href={`/polls/${poll.id}`}>Vote Now</Link>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPolls } from '@/data/mock-polls';

export default function Home() {
  // Get the 3 most recent polls for the showcase
  const recentPolls = [...mockPolls]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="container py-8 space-y-12 mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Create and Share Interactive Polls
          </h1>
          <p className="text-xl text-muted-foreground">
            Polly makes it easy to create polls, gather opinions, and analyze results in real-time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/polls/create">Create a Poll</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/polls">Browse Polls</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose Polly?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to create engaging polls and get meaningful insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Create</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create beautiful polls in seconds with our intuitive interface. No technical skills required.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Watch votes come in and see results update instantly. Share results with participants.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Control who can access your polls. Set expiration dates and manage permissions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Polls Section */}
      <section className="py-12 space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Recent Polls</h2>
            <p className="text-muted-foreground">Check out some of the latest polls from our community</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/polls">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPolls.map((poll) => (
            <Card key={poll.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{poll.title}</CardTitle>
                {poll.description && (
                  <CardDescription className="line-clamp-2">{poll.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{poll.totalVotes} votes</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/polls/${poll.id}`}>Vote Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}