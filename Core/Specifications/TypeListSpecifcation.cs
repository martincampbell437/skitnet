using System;
using Core.Entities;

namespace Core.Specifications;

public class TypeListSpecifcation : BaseSpecification<Product, string>
{
    public TypeListSpecifcation()
    {
        AddSelect(x=>x.Type);
        ApplyDistinct();
    }
}
