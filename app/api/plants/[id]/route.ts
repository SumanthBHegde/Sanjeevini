import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and has admin rights
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Verify user is an admin
    if (session.user.role !== "admin" && !session.user.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }
    
    const plantId = params.id;
    
    if (!plantId) {
      return NextResponse.json(
        { success: false, message: "Plant ID is required" },
        { status: 400 }
      );
    }
    
    // Delete the plant from Sanity
    await writeClient.delete(plantId);
    
    return NextResponse.json(
      { success: true, message: "Plant deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting plant:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to delete plant", 
        error: errorMessage || "Unknown error" 
      },
      { status: 500 }
    );
  }
}