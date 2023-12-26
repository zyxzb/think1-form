import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  console.log('data --->', data);

  const file: File | null = data.get('file') as unknown as File;
  console.log('file --->', file);

  if (!file) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return new NextResponse('Success', {
    status: 201,
  });
};
