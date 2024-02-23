import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image, { StaticImageData } from "next/image"
import { Github, LinkedinIcon } from "lucide-react"
import Link from "next/link";

import saifurRahman from '@/assets/saifur-rahman.jpg';
import imranHossain from '@/assets/imran-hossain.jpg';
import nasifAhmed from '@/assets/nasif-ahmed.jpg';

type TeamMember = {
    id: number;
    name: string;
    designation: string;
    socialLinks: string[];
    teamMemberPhoto: StaticImageData;
};

const Team = () => {

    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Saifur Rahman",
            designation: "mern stack developer",
            socialLinks: ["https://github.com/sifurr", "https://linkedin.com/in/mr-saifur-rahman"],
            teamMemberPhoto: saifurRahman
        },
        {
            id: 2,
            name: "Imran Hossain",
            designation: "mern stack developer",
            socialLinks: ["https://github.com/faraazhossainimran", "https://www.linkedin.com/in/faraazhossainimran"],
            teamMemberPhoto: imranHossain
        },
        {
            id: 3,
            name: "Nasif Ahmed",
            designation: "mern stack developer",
            socialLinks: ["https://github.com/NasifAhmed", "https://www.linkedin.com/in/nasif2ahmed"],
            teamMemberPhoto: nasifAhmed
        }
    ]

    const quote: string = "A team is not a team until it learns to say 'WE'. Individually, anyone may grow faster, but with a team, you grow stronger.";

    return (
        <div>
            <div>
                <div className="w-1/5 mx-auto">
                    <h2 className="mt-10 mb-10 text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-gray-300">
                        Team Players
                    </h2>
                </div>
                <div className="w-1/2 mx-auto">
                    <p className="text-justify text-gray-300 ">
                        Meet our formidable team of three, united in our pursuit of excellence in building <b>Key Storm</b>, a cutting-edge touch typing project. With diverse skills and unwavering dedication, we collaborate seamlessly to create an immersive typing experience. Together, we are poised to conquer any obstacle and deliver outstanding results.
                    </p>
                </div>
                <div className="mx-auto w-1/2 mb-16">

                    <blockquote className="mt-6 border-l-2 pl-6 italic text-gray-300 ">
                        {quote}
                    </blockquote>
                </div>
            </div>



            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 w-3/5 mx-auto mb-20">
                {
                    teamMembers.map(member => (
                        <Card key={member.id} className="w-[250px] mx-auto">
                            <CardHeader>
                                <Image src={member.teamMemberPhoto} width={200} height={100} alt={member.name} />
                            </CardHeader>
                            <CardContent className="space-y-1 text-center">
                                <CardTitle>
                                    <span className="uppercase">{member.name}</span>
                                </CardTitle>
                                <CardDescription>
                                    <span className="uppercase ">{member.designation}</span>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex gap-2 justify-center items-center">
                                <Link target="_blank" href={member.socialLinks[0]} >
                                    <Github />
                                </Link>
                                <Link target="_blank" href={member.socialLinks[1]} >
                                    <LinkedinIcon />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}


export default Team;