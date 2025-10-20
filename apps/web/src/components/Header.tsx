import React from "react";
import { typography } from "@/styles/typography";
import Link from "next/link";
import ThemedButton from "@/components/themed/button";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

export const Header: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>
            <div className="h-22 w-full border-[1px] border-gray-800 px-12 flex items-center justify-between">
                <div className="flex items-center">
                    <Image src="/twoside-bold.png" height={56} width={56} />
                    <Link className="no-underline ms-2" href={"/"}>
                        <span className={typography.h1}>TWOSIDE</span>
                    </Link>
                </div>
                <ThemedButton
                    style="primary"
                    variant="outline"
                    size="lg"
                    className="w-50 h-10 rounded-full flex items-center"
                    onClick={() => {
                        pathname == "/" ? router.push('/dashboard') : router.push('/')
                    }}
                >
                    <span className={typography.h4}>{pathname == "/" ? "Launch dApp" : "Go Home"}</span>
                    <ChevronRight size />
                </ThemedButton>
            </div>
        </>
    );
};