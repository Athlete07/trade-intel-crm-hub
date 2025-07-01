
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Package, Building2 } from "lucide-react";

interface CompanyTypeSelectorProps {
  onTypeSelected: (type: "Buyer" | "Seller") => void;
  onCancel: () => void;
}

export function CompanyTypeSelector({ onTypeSelected, onCancel }: CompanyTypeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Company</h1>
          <p className="text-gray-600">Select the type of company you want to add</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-500">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Buyer Company</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-lg">
              Companies that purchase goods and services for import or domestic use
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Import/Purchase requirements</p>
              <p>• Credit terms and payment methods</p>
              <p>• Quality standards and specifications</p>
              <p>• Import licenses and certifications</p>
              <p>• Procurement team contacts</p>
            </div>
            <Button 
              onClick={() => onTypeSelected("Buyer")} 
              className="w-full mt-6"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add Buyer Company
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-purple-500">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Seller Company</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 text-lg">
              Companies that manufacture or supply goods and services for export or domestic sale
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Product catalog and manufacturing capacity</p>
              <p>• Export capabilities and experience</p>
              <p>• Quality certifications and standards</p>
              <p>• Export licenses and compliance</p>
              <p>• Sales team and support contacts</p>
            </div>
            <Button 
              onClick={() => onTypeSelected("Seller")} 
              className="w-full mt-6"
              size="lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Add Seller Company
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Building2 className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Need Both Types?</h3>
              <p className="text-blue-700 text-sm">
                If your company both buys and sells, you can create it as either type and update the company type later in the detailed form. 
                The intake form will adjust to collect relevant information based on your selection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
