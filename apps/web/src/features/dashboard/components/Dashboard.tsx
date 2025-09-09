import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LockPanel from "./LockPanel";
import UnlockPanel from "./UnlockPanel";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { selectedBlockchainAtom } from "@/store/global";
import { useAllTokensList } from "../hooks/query/tokens";
import DashboardSkeleton from "@/features/dashboard/components/skeletons/DashboardSkeleton";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Lock");

  const blockchainStateValue = useAtomValue(selectedBlockchainAtom);
  const {
    isFetching: isAllTokensListLoading,
    data: selectedBlockchainAllTokensList,
  } = useAllTokensList(blockchainStateValue.id);

  if (isAllTokensListLoading) return <DashboardSkeleton />;

  return (
    <div className="mx-auto mt-6 mb-12">
      <div className="w-120 min-h-80 rounded-2xl p-4 bg-custom-dashboard-primary-color border border-white/30">
        <Tabs
          defaultValue="Lock"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="w-full bg-transparent flex justify-between">
            <div>
              <TabsTrigger
                key="Lock"
                value="Lock"
                className={`cursor-pointer data-[state=active]:bg-transparent text-sm leading-none font-medium
                data-[state=active]:text-custom-primary-text data-[state=inactive]:text-custom-muted-text`}
              >
                Lock
              </TabsTrigger>
              <TabsTrigger
                key="Unlock"
                value="Unlock"
                className={`cursor-pointer data-[state=active]:bg-transparent text-sm leading-none font-medium
                data-[state=active]:text-custom-primary-text data-[state=inactive]:text-custom-muted-text`}
              >
                Unlock
              </TabsTrigger>
            </div>
          </TabsList>
          <div className="px-4">
            <TabsContent key="Lock" value="Lock">
              <LockPanel
                blockchain={blockchainStateValue}
                fetchedTokens={selectedBlockchainAllTokensList}
              />
            </TabsContent>
            <TabsContent key="Unlock" value="Unlock">
              <UnlockPanel
                blockchain={blockchainStateValue}
                fetchedTokens={selectedBlockchainAllTokensList}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
