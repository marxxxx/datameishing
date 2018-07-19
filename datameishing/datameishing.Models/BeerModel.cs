using System;

namespace datamaishing.Models
{
    public class BeerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public BeerModel()
        {
        }

        public BeerModel(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}
