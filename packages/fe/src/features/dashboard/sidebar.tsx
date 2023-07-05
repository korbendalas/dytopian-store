import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/cn';
import { SidebarItem } from '@/pages';
import { Link } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  sidebarItems: SidebarItem[];
}
export function Sidebar({ className, sidebarItems }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <ScrollArea className="h-screen px-2">
        <div className="space-y-4 py-4">
          <div className="py-2">
            {sidebarItems?.map((item, i) => {
              return (
                <div className="px-4 py-2">
                  <h2 className="relative text-start text-xs font-semibold tracking-tight text-gray-500">
                    {item.sectionTitle}
                  </h2>
                  {item.children && item?.children?.length > 0 ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{item?.name}</AccordionTrigger>
                        <AccordionContent>
                          {item?.children?.map((child, i) => {
                            return (
                              <Link to={child?.href}>
                                <Button
                                  key={`${child}-${i}`}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start font-normal"
                                >
                                  <span className="mr-2 h-4 w-4">
                                    {child?.icon}
                                  </span>

                                  {child.name}
                                </Button>
                              </Link>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link to={item?.href}>
                      <Button
                        key={`${item}-${i}`}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal"
                      >
                        <span className="mr-2 h-4 w-4">{item?.icon}</span>
                        {item.name}
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
