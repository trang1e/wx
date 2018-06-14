// test01View.cpp : implementation of the CTest01View class
//

#include "stdafx.h"
#include "test01.h"

#include "test01Doc.h"
#include "test01View.h"
#include<math.h>
#define PI 3.1415926
#define Round(d) int(floor(d+0.5))
#include <math.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#undef THIS_FILE
static char THIS_FILE[] = __FILE__;
#endif

/////////////////////////////////////////////////////////////////////////////
// CTest01View

IMPLEMENT_DYNCREATE(CTest01View, CView)

BEGIN_MESSAGE_MAP(CTest01View, CView)
	//{{AFX_MSG_MAP(CTest01View)
		// NOTE - the ClassWizard will add and remove mapping macros here.
		//    DO NOT EDIT what you see in these blocks of generated code!
	//}}AFX_MSG_MAP
	// Standard printing commands
	ON_COMMAND(ID_FILE_PRINT, CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, CView::OnFilePrintPreview)
END_MESSAGE_MAP()

/////////////////////////////////////////////////////////////////////////////
// CTest01View construction/destruction

CTest01View::CTest01View()
{
	// TODO: add construction code here

}

CTest01View::~CTest01View()
{
}

BOOL CTest01View::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return CView::PreCreateWindow(cs);
}

/////////////////////////////////////////////////////////////////////////////
// CTest01View drawing

void CTest01View::OnDraw(CDC* pDC)
{
	CTest01Doc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	// TODO: add draw code for native data here

		CRect rect;
	    GetClientRect(&rect);
	    pDC->SetMapMode(MM_ANISOTROPIC);
      	pDC->SetWindowExt(rect.Width(),rect.Height());
    	pDC->SetViewportExt(rect.Width(),-rect.Height());
    	pDC->SetViewportOrg(rect.Width()/2,rect.Height()/2);
    	rect.OffsetRect(-rect.Width()/2,-rect.Height()/2);

		
		CPen penBlack(PS_SOLID,1,RGB(0,0,0));//¶¨ÒåºÚÉ«»­±Ê
		CPen *pOldPen=pDC->SelectObject(&penBlack);
		int r=200;
		CPoint p[5];
		double Beta=2*PI/5;
		double Alpha=27/10;    
		for(int t=0;t<5;t++){
		
			p[t].x=Round(r*cos(t*Beta+Alpha));
			p[t].y=Round(r*sin(t*Beta+Alpha));
		}
	
/*		CPoint v[5];
		v[1]=p[4];
		v[2]=p[2];
		v[3]=p[0];
		v[4]=p[3];
		v[0]=p[1];
		*/
	//	pDC->Polygon(v,5);
		CPoint d[5];

		double Beta1=PI/5;
		double Beta2=(3*PI)/10;
		for(int n=0;n<5;n++){
			d[n].x=Round((200*cos(Beta1)-(200*cos(Beta2)*cos(Beta2))/cos(Beta1))*cos(n*Beta+Alpha+PI));
			d[n].y=Round((200*cos(Beta1)-(200*cos(Beta2)*cos(Beta2))/cos(Beta1))*sin(n*Beta+Alpha+PI));
		}


		//pDC->Polygon(v,5);
		//pDC->Polygon(d,5);
/*		
		pDC->MoveTo(d[0]);
	
		pDC->LineTo(d[1]);
    	pDC->LineTo(d[2]);
		pDC->LineTo(d[3]);
		pDC->LineTo(d[4]);
		pDC->LineTo(d[0]);
*/
		


		CPoint f[10];
		f[0]=p[0];
		f[1]=d[3];
		f[2]=p[1];
		f[3]=d[4];
		f[4]=p[2];
		f[5]=d[0];
		f[6]=p[3];
		f[7]=d[1];
		f[8]=p[4];
		f[9]=d[2];
		pDC->MoveTo(f[0]);
		pDC->LineTo(f[1]);
		pDC->LineTo(f[2]);
		pDC->LineTo(f[3]);
		pDC->LineTo(f[4]);
		pDC->LineTo(f[5]);
		pDC->LineTo(f[6]);
		pDC->LineTo(f[7]);
		pDC->LineTo(f[8]);
		pDC->LineTo(f[9]);
		pDC->LineTo(f[0]);
		
		CBrush brushRed(RGB(255,0,0));
		CBrush *pOldBrush=pDC->SelectObject(&brushRed);
		pDC->Polygon(f,10);
		pDC->SelectObject(pOldBrush);
	//	pDC->LineTo(0,0);
	/*

		pDC->SelectObject(pOldPen);
		COLORREF BClr=RGB(255,255,255);
		COLORREF FClr=RGB(255,0,0);
		int yMin,yMax;
		double x,y,k;
		for(int i=0;i<10;i++){
			int j=(i+1)%10;
			k=(f[i].x-f[j].x)/(f[i].y-f[j].y);
			if(f[i].y<f[j].y){
				yMin=Round(f[i].y);
				yMax=Round(f[j].y);
				x=f[i].x;
			
			}
		
		else
		{
				yMin=Round(f[j].y);
				yMax=Round(f[i].y);
				x=f[j].x;
		}
		for(y=yMin;y<yMax;y++){
		
				for(int m=Round(x);m<f[6].x;m++)
				{
					if(FClr==pDC->GetPixel(m,Round(y)))
						pDC->SetPixelV(m,Round(y),BClr);
					else
						pDC->SetPixelV(m,Round(y),FClr);
				}
				x+=k;
		}

	
		}
	*/

}

/////////////////////////////////////////////////////////////////////////////
// CTest01View printing

BOOL CTest01View::OnPreparePrinting(CPrintInfo* pInfo)
{
	// default preparation
	return DoPreparePrinting(pInfo);
}

void CTest01View::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add extra initialization before printing
}

void CTest01View::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add cleanup after printing
}

/////////////////////////////////////////////////////////////////////////////
// CTest01View diagnostics

#ifdef _DEBUG
void CTest01View::AssertValid() const
{
	CView::AssertValid();
}

void CTest01View::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CTest01Doc* CTest01View::GetDocument() // non-debug version is inline
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CTest01Doc)));
	return (CTest01Doc*)m_pDocument;
}
#endif //_DEBUG

/////////////////////////////////////////////////////////////////////////////
// CTest01View message handlers

